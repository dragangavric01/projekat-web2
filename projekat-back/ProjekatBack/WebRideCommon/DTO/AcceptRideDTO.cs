using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebRideCommon.DTO {
    public class AcceptRideDTO {
        public Period WaitTime { get; set; }
        public Period Duration { get; set; }

        public AcceptRideDTO() { }

        public AcceptRideDTO(Period waitTime, Period duration) {
            WaitTime = waitTime;
            Duration = duration;
        }
    }
}
