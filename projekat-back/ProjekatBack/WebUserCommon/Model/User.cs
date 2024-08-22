using Azure;
using Azure.Data.Tables;
using Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace WebUserCommon.Model {
    public enum UserRole { Client = 0, Driver = 1, Admin = 2 }

    public class User : ITableEntity {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public UserRole? Role { get; set; }

        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }


        public User() { }

        public User(string username, string email, string password, string firstName, string lastName, string dateOfBirth, string address, UserRole? role) {
            Username = username;
            Email = email;
            Password = password;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Address = address;
            Role = role;

            PartitionKey = "UserPartition";
            RowKey = Guid.NewGuid().ToString();
        }
    }
}
