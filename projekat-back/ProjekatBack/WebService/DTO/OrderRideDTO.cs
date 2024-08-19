using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebRideCommon.DTO {
    public class OrderRideDTO {
        public string StartAddress { get; set; }
        public string DestinationAddress { get; set; }

        public OrderRideDTO() { }

        public OrderRideDTO(string startAddress, string destinationAddress) {
            StartAddress = startAddress;
            DestinationAddress = destinationAddress;
        }
    }
}
