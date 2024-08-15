using Azure;
using Azure.Data.Tables;
using Common.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace WebUserCommon.Model {
    [DataContract]
    public class User : ITableEntity {
        [DataMember]
        public string Username { get; set; }
        [DataMember]
        public string Email { get; set; }
        [DataMember]
        public string Password { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public string DateOfBirth { get; set; }
        [DataMember]
        public string Address { get; set; }
        [DataMember]
        public UserRole Role { get; set; }

        [DataMember]
        public string PartitionKey { get; set; }
        [DataMember]
        public string RowKey { get; set; }
        [DataMember]
        public DateTimeOffset? Timestamp { get; set; }
        [DataMember]
        public ETag ETag { get; set; }


        public User() { }

        public User(string username, string email, string password, string firstName, string lastName, string dateOfBirth, string address, UserRole role) {
            Username = username;
            Email = email;
            Password = password;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Address = address;
            Role = role;

            PartitionKey = "UserPartition";
            RowKey = username;
        }
    }
}
