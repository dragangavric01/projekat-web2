using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebRideCommon {
    public class Period {
        public int Minutes { get; set; }
        public int Seconds { get; set; }

        public Period() { }

        public Period(int minutes, int seconds) {
            Minutes = minutes;
            Seconds = seconds;
        }

        public Period(string periodString) {
            string[] parts = periodString.Split(':');

            Minutes = Int32.Parse(parts[0]);
            Seconds = Int32.Parse(parts[1]);
        }

        public override string ToString() {
            return Minutes + ":" + Seconds;
        }

        public int ToMilliseconds() {
            int seconds = Minutes * 60 + Seconds;
            return seconds * 1000;
        }
    }
}
