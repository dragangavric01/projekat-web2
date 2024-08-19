using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebRideCommon.DTO {
    public class OrderRideReturnDTO {
        public double Price { get; set; }
        public Period WaitTime { get; set; }

        public OrderRideReturnDTO() { }

        public OrderRideReturnDTO(double price, Period waitTime) {
            Price = price;
            WaitTime = waitTime;
        }
    }
}
