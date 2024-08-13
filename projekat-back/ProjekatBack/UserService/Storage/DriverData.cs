using Azure;
using Azure.Data.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserService.Storage {
    public enum RegistrationRequestStatus { Pending, Accepted, Denied }

    public class DriverData : ITableEntity {
        public string Username { get; set; }
        public RegistrationRequestStatus RegistrationRequestStatus { get; set; }
        public bool Blocked { get; set; }

        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }


        public DriverData(string username, RegistrationRequestStatus registrationRequestStatus, bool blocked) {
            Username = username;
            RegistrationRequestStatus = registrationRequestStatus;
            Blocked = blocked;

            PartitionKey = "DriverDataPartition";
            RowKey = username;
        }
    }
}
