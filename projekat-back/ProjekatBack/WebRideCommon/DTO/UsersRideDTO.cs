using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebRideCommon.Model;

namespace WebRideCommon.DTO {
    public class UsersRideDTO {
        public string CreationDateAndTime { get; set; }
        public string StartAddress { get; set; }
        public string DestinationAddress { get; set; }
        public double Price { get; set; }

        public UsersRideDTO() {}

        public UsersRideDTO(Ride ride) {
            CreationDateAndTime = ride.CreationDateAndTime;
            StartAddress = ride.StartAddress;
            DestinationAddress = ride.DestinationAddress;
            Price = ride.Price;
        }
    }
}
