﻿using Common.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebUserCommon.DTO {

    public class ProfileDTO {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateOfBirth { get; set; }
        public string Address { get; set; }
        public UserRole Role { get; set; }
        public BinaryData Picture { get; set; }

        public ProfileDTO(string username, string email, string password, string firstName, string lastName, string dateOfBirth, string address, UserRole role, BinaryData picture) {
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
