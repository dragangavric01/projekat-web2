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
            try {
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
            } catch (Exception) {
                return null;
            }

            return ride.RowKey;
        }

        public Ride ReadRide(string rideRowKey) {
            try {
                var result = tableClient.GetEntity<Ride>("RidePartition", rideRowKey);
                return result.Value;
            } catch (Exception) {
                return null;
            }
        }

        public List<Ride> ReadRides() {
            try {
                Pageable<Ride> queryResults = tableClient.Query<Ride>();
                return queryResults.AsEnumerable().ToList();
            } catch (Exception) {
                return null;
            }
        }

        public List<Ride> ReadRequestedRides() {
            try {
                Pageable<Ride> queryResults = tableClient.Query<Ride>(filter: $"Status eq '{RideStatus.Requested.ToString()}'");
                return queryResults.AsEnumerable().ToList();
            } catch (Exception ex) {
                return null;
            }
        }

        public List<Ride> ReadUsersRides(string username) {
            try {
                Pageable<Ride> queryResults = tableClient.Query<Ride>(filter: ride => ride.ClientUsername == username || ride.DriverUsername == username);
                return queryResults.AsEnumerable().ToList();
            } catch (Exception ex) {
                return null;
            }
        }

        public bool UpdateRideStatus(string rideRowKey, RideStatus rideStatus) {
            Ride ride = ReadRide(rideRowKey);
            if (ride == null) {
                return false;
            }

            ride.Status = rideStatus;

            try {
                tableClient.UpdateEntity(ride, ride.ETag, TableUpdateMode.Merge);
            } catch (Exception) {
                return false;
            }

            return true;
        }

        public bool UpdateRideStatusAndDriverUsername(string rideRowKey, RideStatus rideStatus, string driverUsername) {
            Ride ride = ReadRide(rideRowKey);
            if (ride == null) {
                return false;
            }

            ride.Status = rideStatus;
            ride.DriverUsername = driverUsername;

            try {
                tableClient.UpdateEntity(ride, ride.ETag, TableUpdateMode.Merge);
            } catch (Exception) {
                return false;
            }

            return true;
        }

        public bool UpdateRideRating(string rideRowKey, int driverRating) {
            Ride ride = ReadRide(rideRowKey);
            if (ride == null) {
                return false;
            }

            ride.DriverRating = driverRating;

            try {
                tableClient.UpdateEntity(ride, ride.ETag, TableUpdateMode.Merge);
            } catch (Exception) {
                return false;
            }

            return true;
        }
    }
}
