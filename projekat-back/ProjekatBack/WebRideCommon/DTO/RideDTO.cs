using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebRideCommon.Model;

namespace WebRideCommon.DTO {
    public class RideDTO {
        public string CreationDateAndTime { get; set; }
        public string StartAddress { get; set; }
        public string DestinationAddress { get; set; }
        public double Price { get; set; }
        public string DriverUsername { get; set; }
        public string ClientUsername { get; set; }
        public RideStatus Status { get; set; }

        public RideDTO() {}

        public RideDTO(Ride ride) {
            CreationDateAndTime = ride.CreationDateAndTime;
            StartAddress = ride.StartAddress;
            DestinationAddress = ride.DestinationAddress;
            Price = ride.Price;
            DriverUsername = ride.DriverUsername;
            ClientUsername = ride.ClientUsername;
            Status = ride.Status;
        }
    }
}
