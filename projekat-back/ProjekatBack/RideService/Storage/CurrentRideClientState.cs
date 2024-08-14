using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RideService.Storage {
    public class CurrentRideClientState {
        public string RideId { get; set; }
        public string StartAddress { get; set; }
        public string DestinationAddress { get; set; }
        public float Price { get; set; }
        public int WaitTimeInMinutes { get; set; }
    }
}
