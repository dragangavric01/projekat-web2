using Azure.Data.Tables;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserService.Storage {
    public class DriverDataStorageManager {
        private readonly TableClient tableClient;

        public DriverDataStorageManager() {
            var tableServiceClient = new TableServiceClient("UseDevelopmentStorage=true");
            tableClient = tableServiceClient.GetTableClient("DriverDataTable");
            tableClient.CreateIfNotExists();
        }
    }
}
