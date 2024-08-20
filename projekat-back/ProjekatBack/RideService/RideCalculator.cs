using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebRideCommon;

namespace RideService {
    public class RideCalculator {
        Random random = new Random();

        public double GetRidePrice(string startAddress, string destinationAddress) {
            return Math.Round(GetRandomDouble(3, 15), 2);
        }

        public Period GetRideWaitTime(string startAddress, string destinationAddress) {
            return new Period(0, random.Next(7, 13));
        }

        public Period GetRideDuration(string startAddress, string destinationAddress) {
            return new Period(0, random.Next(15, 25));
        }

        private double GetRandomDouble(double min, double max) {
            return random.NextDouble() * (max - min) + min;
        }
    }
}
