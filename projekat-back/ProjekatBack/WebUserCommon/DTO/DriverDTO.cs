using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using UserService.Storage;
using WebUserCommon.Model;

namespace WebUserCommon.DTO {
    public class DriverDTO {
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public RegistrationRequestStatus RegistrationRequestStatus { get; set; }
        public bool Blocked { get; set; }
        public string Picture { get; set; }

        public DriverDTO() {
        }

        public DriverDTO(User user, string picture, DriverData driverData) {
            Username = user.Username;
            Email = user.Email;
            FirstName = user.FirstName;
            LastName = user.LastName;
            DateOfBirth = user.DateOfBirth;
            Address = user.Address;
            Picture = picture;
            RegistrationRequestStatus = driverData.RegistrationRequestStatus;
            Blocked = driverData.Blocked;
        }
    }
}
