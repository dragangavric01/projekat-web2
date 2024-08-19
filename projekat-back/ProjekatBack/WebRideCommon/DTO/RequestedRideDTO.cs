using Azure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebRideCommon.Model;

namespace WebRideCommon.DTO {
    public class RequestedRideDTO {
        public string StartAddress { get; set; }
        public string DestinationAddress { get; set; }
        public double Price { get; set; }
        public string RowKey { get; set; }

        public RequestedRideDTO() { }

        public RequestedRideDTO(Ride ride) {
            StartAddress = ride.StartAddress;
            DestinationAddress = ride.DestinationAddress;
            Price = ride.Price;
            RowKey = ride.RowKey;
        }
    }
}
