using Azure;
using Azure.Data.Tables;
using System;
using System.Collections.Generic;
using System.Fabric.Query;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebRideCommon.DTO;
using WebRideCommon.Model;

namespace RideService.Storage {
    public class RideStorageManager {
        private readonly TableClient tableClient;

        public RideStorageManager() {
            var tableServiceClient = new TableServiceClient("UseDevelopmentStorage=true");
            tableClient = tableServiceClient.GetTableClient("RidesTable");
            tableClient.CreateIfNotExists();
        }

        public string CreateRide(Ride ride) {
            Try:
            try {
                tableClient.AddEntity(ride);
            } catch (RequestFailedException ex) {
                if (ex.Status == 409) {
                    // RowKey already exists
                    ride.RowKey = Guid.NewGuid().ToString();
                    goto Try;
                }
            }

            return ride.RowKey;
        }

        public Ride ReadRide(string rideRowKey) {
            var result = tableClient.GetEntity<Ride>("RidePartition", rideRowKey);
            return result.Value;
        }

        public List<Ride> ReadRides() {
            Pageable<Ride> queryResults = tableClient.Query<Ride>();
            if (queryResults == null) {
                return new List<Ride>();
            }

            return queryResults.AsEnumerable().ToList();
        }

        public List<Ride> ReadRequestedRides() {
            Pageable<Ride> queryResults = tableClient.Query<Ride>(filter: $"Status eq '{RideStatus.Requested.ToString()}'");
            if (queryResults == null) {
                return new List<Ride>();
            }

            return queryResults.AsEnumerable().ToList();
        }

        public List<Ride> ReadUsersRides(string username) {
            Pageable<Ride> queryResults = tableClient.Query<Ride>(filter: ride => ride.ClientUsername == username || ride.DriverUsername == username);
            if (queryResults == null) {
                return new List<Ride>();
            }

            return queryResults.AsEnumerable().ToList();
        }

        public void UpdateRideStatus(string rideRowKey, RideStatus rideStatus) {
            Ride ride = ReadRide(rideRowKey);

            ride.Status = rideStatus;

            tableClient.UpdateEntity(ride, ride.ETag, TableUpdateMode.Merge);
        }

        public void UpdateRideStatusAndDriverUsername(string rideRowKey, RideStatus rideStatus, string driverUsername) {
            Ride ride = ReadRide(rideRowKey);

            ride.Status = rideStatus;
            ride.DriverUsername = driverUsername;

            tableClient.UpdateEntity(ride, ride.ETag, TableUpdateMode.Merge);
        }

        public void UpdateRideRating(string rideRowKey, int driverRating) {
            Ride ride = ReadRide(rideRowKey);

            ride.DriverRating = driverRating;

            tableClient.UpdateEntity(ride, ride.ETag, TableUpdateMode.Merge);
        }
    }
}
