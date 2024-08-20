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
            try {
                tableClient.AddEntity(driverData);
            } catch (Exception) {
                return false;
            }

            return true;
        }

        public DriverData ReadDriverData(string driverUsername) {
            try {
                Pageable<DriverData> queryResults = tableClient.Query<DriverData>(filter: driverData => driverData.Username == driverUsername);
                return queryResults.First();
            } catch (Exception) {
                return null;
            }
        }

        public List<DriverData> ReadDriverDatas() {
            try {
                Pageable<DriverData> queryResults = tableClient.Query<DriverData>();
                return queryResults.AsEnumerable().ToList();
            } catch (Exception) {
                return null;
            }
        }
    }
}
