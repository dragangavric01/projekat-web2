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
using WebUserCommon.DTO;

namespace UserService.Storage {
    public class UserStorageManager {
        private readonly TableClient tableClient;
        private readonly BlobContainerClient blobContainerClient;

        public UserStorageManager() {
            BlobServiceClient blobServiceClient = new BlobServiceClient("UseDevelopmentStorage=true");
            blobContainerClient = blobServiceClient.GetBlobContainerClient("aaaaa");
            blobContainerClient.CreateIfNotExists(PublicAccessType.Blob);

            var tableServiceClient = new TableServiceClient("UseDevelopmentStorage=true");
            tableClient = tableServiceClient.GetTableClient("UsersTable");
            tableClient.CreateIfNotExists();
        }

        public void CreateUser(User user, BinaryData picture) {
            tableClient.AddEntity(user);

            CreateOrUpdatePictureBlob(user.PictureName, picture);
        }

        public ProfileDTO ReadUser(string username) {
            var response = tableClient.GetEntity<User>("UserPartition", username);
            User user = response.Value;

            BinaryData picture = ReadPictureBlob(user.PictureName);

            return new ProfileDTO(user.Username, user.Email, user.PasswordHash, user.FirstName, user.LastName, user.DateOfBirth, user.Address, user.Role, picture);
        }

        public void CreateOrUpdatePictureBlob(string pictureName, BinaryData picture) {
            BlobClient blobClient = blobContainerClient.GetBlobClient(pictureName);
            blobClient.Upload(picture);
        }


        public BinaryData ReadPictureBlob(string pictureName) {
            BlobClient blobClient = blobContainerClient.GetBlobClient(pictureName);
            BlobDownloadResult result = blobClient.DownloadContent();

            return result.Content;
        }
    }
}
