using Azure;
using Azure.Data.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebRideCommon.Model {
    public enum RideStatus { Requested = 0, InProgress = 1, Finished = 2 }

    public class Ride : ITableEntity {
        public string CreationDateAndTime { get; set; }
        public string StartAddress { get; set; }
        public string DestinationAddress { get; set; }
        public double Price { get; set; }
        public string DriverUsername { get; set; }
        public string ClientUsername { get; set; }
        public RideStatus Status { get; set; }
        public string WaitTime { get; set; }
        public string Duration { get; set; }
        public int DriverRating { get; set; }

        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }


        public Ride() { }

        public Ride(string creationDateAndTime, string startAddress, string destinationAddress, double price, string driverUsername, string clientUsername, RideStatus status, string waitTime, string duration, int driverRating) {
            CreationDateAndTime = creationDateAndTime;
            StartAddress = startAddress;
            DestinationAddress = destinationAddress;
            Price = price;
            DriverUsername = driverUsername;
            ClientUsername = clientUsername;
            Status = status;
            WaitTime = waitTime;
            Duration = duration;
            DriverRating = driverRating;

            PartitionKey = "RidePartition";
            RowKey = Guid.NewGuid().ToString();
        }
    }
}
