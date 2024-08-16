using Common.Model;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace UserService {
    public class Token {
        public string Content { get; set; }

        public Token(string secretKey, string issuerURL, string username, UserRole? userRole) {


            var claims = new[] {
                new Claim(ClaimTypes.Name, username),
                new Claim(ClaimTypes.Role, userRole.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: issuerURL,
                expires: DateTime.UtcNow.AddHours(1),
                claims: claims,
                signingCredentials: creds);

            var tokenHandler = new JwtSecurityTokenHandler();
            Content = tokenHandler.WriteToken(token);
        }
    }
}
