using Common;
using Microsoft.AspNetCore.Http;
using WebUserCommon.Model;

namespace WebService.DTO
{
    public class ProfileUploadDTO {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public UserRole? Role { get; set; }
        public IFormFile Picture { get; set; }

        public ProfileUploadDTO() { }

        public ProfileUploadDTO(string username, string email, string password, string firstName, string lastName, string dateOfBirth, string address, UserRole? role, IFormFile picture) {
            Username = username;
            Email = email;
            Password = password;
            FirstName = firstName;
            LastName = lastName;
            DateOfBirth = dateOfBirth;
            Address = address;
            Role = role;
            Picture = picture;
        }
    }
}
