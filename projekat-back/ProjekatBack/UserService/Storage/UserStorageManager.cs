using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Azure.Storage.Blobs;
using System.IO;
using Azure.Data.Tables;
using System.Collections.Concurrent;
using System.ComponentModel;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs.Specialized;
using Azure;
using WebUserCommon.Model;
using System.Net.Http.Headers;

namespace UserService.Storage {
    public class UserStorageManager {
        private readonly TableClient tableClient;
        private readonly BlobContainerClient blobContainerClient;
        private string usersTablePartitionKey = "UserPartition";

        public UserStorageManager() {
            BlobServiceClient blobServiceClient = new BlobServiceClient("UseDevelopmentStorage=true");
            blobContainerClient = blobServiceClient.GetBlobContainerClient("profilepictures");
            blobContainerClient.CreateIfNotExists(PublicAccessType.None);

            var tableServiceClient = new TableServiceClient("UseDevelopmentStorage=true");
            tableClient = tableServiceClient.GetTableClient("UsersTable");
            tableClient.CreateIfNotExists();
        }

        public bool CreateUser(User user, byte[] picture) {
            try {
                Try:
                try {
                    tableClient.AddEntity(user);
                } catch (RequestFailedException ex) {
                    if (ex.Status == 409) {
                        // RowKey already exists
                        user.RowKey = Guid.NewGuid().ToString();
                        goto Try;
                    }
                }

                CreateOrUpdatePictureBlob(user.Username, picture);
            } catch (Exception) {
                return false;
            }

            return true;
        }

        public User ReadUser(string username) {
            try {
                Pageable<User> queryResults = tableClient.Query<User>(filter: user => user.Username == username);
                return queryResults.First();
            } catch (Exception) {
                return null;
            }
        }

        public User ReadUserByEmail(string email) {
            try {
                Pageable<User> queryResults = tableClient.Query<User>(filter: user => user.Email == email);
                return queryResults.First();
            } catch (Exception) {
                return null;
            }
        }

        public bool UpdateUser(string username, User user, byte[] picture) {
            User existingUser = ReadUser(username);
            if (existingUser == null) {
                return false;
            }

            if (user.Username != null) {
                existingUser.Username = user.Username;
            }

            if (user.Email != null) {
                existingUser.Email = user.Email;
            }

            if (user.Password != null) {
                existingUser.Password = user.Password;
            }

            if (user.FirstName != null) {
                existingUser.FirstName = user.FirstName;
            }

            if (user.LastName != null) {
                existingUser.LastName = user.LastName;
            }

            if (user.DateOfBirth != null) {
                existingUser.DateOfBirth = user.DateOfBirth;
            }

            if (user.Address != null) {
                existingUser.Address = user.Address;
            }

            try {
                tableClient.UpdateEntity(existingUser, existingUser.ETag, TableUpdateMode.Merge);

                if (picture != null) {
                    if (username != existingUser.Username) {
                        CreateOrUpdatePictureBlob(existingUser.Username, picture);
                        DeletePictureBlob(username);
                    } else {
                        CreateOrUpdatePictureBlob(username, picture);
                    }
                } else if (username != existingUser.Username) {
                    ChangePictureBlobName(username, existingUser.Username);
                }
            } catch (Exception) {
                return false;
            }

            return true;
        }

        private void CreateOrUpdatePictureBlob(string username, byte[] picture) {
            BlobClient blobClient = blobContainerClient.GetBlobClient("picture_" + username);
            blobClient.Upload(new BinaryData(picture), overwrite: true);
        }


        public byte[] ReadPictureBlob(string username) {
            try {
                BlobClient blobClient = blobContainerClient.GetBlobClient("picture_" + username);
                BlobDownloadResult result = blobClient.DownloadContent();

                return result.Content.ToArray();
            } catch (Exception) {
                return null;
            }
        }

        private void DeletePictureBlob(string username) {
            BlobClient blobClient = blobContainerClient.GetBlobClient("picture_" + username);
            blobClient.DeleteIfExists(DeleteSnapshotsOption.IncludeSnapshots);
        }

        private void ChangePictureBlobName(string oldUsername, string newUsername) {
            BlobClient blobClient1 = blobContainerClient.GetBlobClient("picture_" + oldUsername);

            BlobDownloadResult result = blobClient1.DownloadContent();

            BlobClient blobClient2 = blobContainerClient.GetBlobClient("picture_" + newUsername);
            blobClient2.Upload(result.Content);

            blobClient1.DeleteIfExists(DeleteSnapshotsOption.IncludeSnapshots);
        }
    }
}
