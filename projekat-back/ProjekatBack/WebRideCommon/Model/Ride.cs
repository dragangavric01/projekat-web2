using Azure;
using Azure.Data.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebRideCommon.Model {
    public enum RideStatus { Requested, Accepted, InProgress, Finished }

    public class Ride : ITableEntity {
        public string RideStartTime { get; set; }
        public string StartAddress { get; set; }
        public string DestinationAddress { get; set; }
        public double Price { get; set; }
        public string DriverUsername { get; set; }
        public string ClientUsername { get; set; }
        public RideStatus Status { get; set; }
        public int DriverRating { get; set; }

        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }


        public Ride() { }

        public Ride(string rideStartTime, string startAddress, string destinationAddress, double price, string driverUsername, string clientUsername, RideStatus status, int driverRating) {
            RideStartTime = rideStartTime;
            StartAddress = startAddress;
            DestinationAddress = destinationAddress;
            Price = price;
            DriverUsername = driverUsername;
            ClientUsername = clientUsername;
            Status = status;
            DriverRating = driverRating;

            PartitionKey = "RidePartition";
            RowKey = Guid.NewGuid().ToString();
            DriverRating = driverRating;
        }
    }
}
