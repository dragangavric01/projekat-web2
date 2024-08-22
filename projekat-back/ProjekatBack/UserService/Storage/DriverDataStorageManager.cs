using Azure.Data.Tables;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure;
using WebUserCommon.Model;
using WebUserCommon.DTO;

namespace UserService.Storage {
    public class DriverDataStorageManager {
        private readonly TableClient tableClient;
        private string partitionKey = "UserPartition";

        public DriverDataStorageManager() {
            var tableServiceClient = new TableServiceClient("UseDevelopmentStorage=true");
            tableClient = tableServiceClient.GetTableClient("DriverDataTable");
            tableClient.CreateIfNotExists();
        }

        public bool CreateDriverData(DriverData driverData) {
            if (ReadDriverData(driverData.Username) != null) {
                return false;
            }

            Try:
            try {
                tableClient.AddEntity(driverData);
            } catch (RequestFailedException ex) {
                if (ex.Status == 409) {
                    // RowKey already exists
                    driverData.RowKey = Guid.NewGuid().ToString();
                    goto Try;
                }
            }

            return true;
        }

        public DriverData ReadDriverData(string driverUsername) {
            Pageable<DriverData> queryResults = tableClient.Query<DriverData>(filter: driverData => driverData.Username == driverUsername);
            if (queryResults == null || queryResults.Count() == 0) {
                return null;
            }

            return queryResults.First();
    }

        public List<DriverData> ReadDriverDatas() {
            Pageable<DriverData> queryResults = tableClient.Query<DriverData>();
            if (queryResults == null || queryResults.Count() == 0) {
                return null;
            }

            return queryResults.AsEnumerable().ToList();
        }

        public bool UpdateDriversUsername(string oldUsername, string newUsername) {
            if (ReadDriverData(newUsername) != null) {
                return false;
            }

            DriverData driverData = ReadDriverData(oldUsername);

            driverData.Username = newUsername;

            tableClient.UpdateEntity(driverData, driverData.ETag, TableUpdateMode.Merge);

            return true;
        }

        public void UpdateDriversRegistrationRequestStatus(string driverUsername, RegistrationRequestStatus newStatus) {
            DriverData driverData = ReadDriverData(driverUsername);

            driverData.RegistrationRequestStatus = newStatus;

            tableClient.UpdateEntity(driverData, driverData.ETag, TableUpdateMode.Merge);
        }
        public void UpdateDriversBlocked(string driverUsername, bool newBlocked) {
            DriverData driverData = ReadDriverData(driverUsername);

            driverData.Blocked = newBlocked;

            tableClient.UpdateEntity(driverData, driverData.ETag, TableUpdateMode.Merge);
        }
    }
}
