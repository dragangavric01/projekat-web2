using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserService.Storage;

namespace WebUserCommon.DTO {
    public class GetStatusAndBlockedDTO {
        public RegistrationRequestStatus RegistrationRequestStatus { get; set; }
        public bool Blocked { get; set; }

        public GetStatusAndBlockedDTO() {
        }

        public GetStatusAndBlockedDTO(DriverData driverData) {
            RegistrationRequestStatus = driverData.RegistrationRequestStatus;
            Blocked = driverData.Blocked;
        }
    }
}
