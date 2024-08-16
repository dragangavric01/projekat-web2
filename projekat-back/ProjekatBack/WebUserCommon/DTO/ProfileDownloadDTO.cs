using Common.Model;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebUserCommon.DTO {
    public class ProfileDownloadDTO {
        public string Username { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Picture { get; set; }

        public ProfileDownloadDTO() { }

        public ProfileDownloadDTO(string username, string email, string firstName, string lastName, string dateOfBirth, string address, string picture) {
            Username = username;
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Address = address;
            Picture = picture;
        }
    }
}
