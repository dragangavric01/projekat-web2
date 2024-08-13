using Azure;
using Azure.Data.Tables;
using Common.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserService.Storage {
    public class User : ITableEntity { 
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public UserRole Role { get; set; }
        public string PictureName { get; set; }

        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }


        public User(string username, string email, string passwordHash, string firstName, string lastName, string dateOfBirth, string address, UserRole role) {
            Username = username;
            Email = email;
            PasswordHash = passwordHash;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Address = address;
            Role = role;

            PictureName = "picture_" + username;

            PartitionKey = "UserPartition";
            RowKey = username;
        }
    }
}
