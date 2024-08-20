using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserService.Storage;

namespace WebUserCommon.DTO {
    public class DriverDataDTO {
        public string Username { get; set; }
        public RegistrationRequestStatus RegistrationRequestStatus { get; set; }
        public bool Blocked { get; set; }

        public DriverDataDTO() {
        }

        public DriverDataDTO(DriverData driverData) {
            Username = driverData.Username;
            RegistrationRequestStatus = driverData.RegistrationRequestStatus;
            Blocked = driverData.Blocked;
        }
    }
}
