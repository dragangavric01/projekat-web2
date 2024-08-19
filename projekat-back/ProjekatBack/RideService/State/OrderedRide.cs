using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebRideCommon;

namespace RideService.State
{
    public class OrderedRide
    {
        public string StartAddress { get; set; }
        public string DestinationAddress { get; set; }
        public double Price { get; set; }
        public Period WaitTime { get; set; }

        public OrderedRide()
        {
        }

        public OrderedRide(string startAddress, string destinationAddress, double price, Period waitTime)
        {
            StartAddress = startAddress;
            DestinationAddress = destinationAddress;
            Price = price;
            WaitTime = waitTime;
        }
    }
}
