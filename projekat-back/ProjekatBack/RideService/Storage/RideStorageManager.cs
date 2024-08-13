using Azure.Data.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RideService.Storage {
    public class RideStorageManager {
        private readonly TableClient tableClient;

        public RideStorageManager() {
            var tableServiceClient = new TableServiceClient("UseDevelopmentStorage=true");
            tableClient = tableServiceClient.GetTableClient("RidesTable");
            tableClient.CreateIfNotExists();
        }
    }
}
