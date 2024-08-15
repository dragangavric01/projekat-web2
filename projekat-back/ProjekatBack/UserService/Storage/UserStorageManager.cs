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

namespace UserService.Storage {
    public class UserStorageManager {
        private readonly TableClient tableClient;
        private readonly BlobContainerClient blobContainerClient;
        private string usersTablePartitionKey = "UserPartition";

        public UserStorageManager() {
            BlobServiceClient blobServiceClient = new BlobServiceClient("UseDevelopmentStorage=true");
            blobContainerClient = blobServiceClient.GetBlobContainerClient("profilepictures");
            blobContainerClient.CreateIfNotExists(PublicAccessType.Blob);

            var tableServiceClient = new TableServiceClient("UseDevelopmentStorage=true");
            tableClient = tableServiceClient.GetTableClient("UsersTable");
            tableClient.CreateIfNotExists();
        }

        public bool CreateUser(User user, byte[] picture) {
            try {
                tableClient.AddEntity(user);
            } catch (RequestFailedException ex) {
                if (ex.Status == 409) {
                    return false;
                }
            }

            CreateOrUpdatePictureBlob(user.Username, picture);

            return true;
        }

        public User ReadUser(string username) {
            var response = tableClient.GetEntity<User>(usersTablePartitionKey, username);

            return response.Value;
        }

        public User ReadUserByEmail(string email) {
            Pageable<User> queryResults = tableClient.Query<User>(filter: user => user.Email == email);

            return queryResults.First();
        }

        public void CreateOrUpdatePictureBlob(string username, byte[] picture) {
            BlobClient blobClient = blobContainerClient.GetBlobClient("picture_" + username);
            blobClient.Upload(new BinaryData(picture));
        }


        public byte[] ReadPictureBlob(string username) {
            BlobClient blobClient = blobContainerClient.GetBlobClient("picture_" + username);
            BlobDownloadResult result = blobClient.DownloadContent();

            return result.Content.ToArray();
        }
    }
}
