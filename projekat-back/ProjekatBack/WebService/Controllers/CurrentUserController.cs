using System;
using System.Collections.Generic;
using System.Fabric.Query;
using System.Fabric;
using System.Net.Http;
using Microsoft.ServiceFabric.Services.Client;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System.Threading.Tasks;
using Common.Model;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Linq;
using WebUserCommon;
using WebUserCommon.DTO;
using Microsoft.AspNetCore.Mvc;
using WebService.DTO;
using WebUserCommon.Model;
using System.IO;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebService.Controllers
{
    [Route("current-user")]
    [ApiController]
    public class CurrentUserController : ControllerBase {
        private readonly IUserService userServiceProxy = ServiceProxy.Create<IUserService>(new Uri("fabric:/ProjekatBack/UserService"));

       [HttpPost("register")]
       public async Task<IActionResult> Register([FromForm] ProfileDTO profileDTO) {
            try {
                User user = new User(profileDTO.Username, profileDTO.Email, profileDTO.Password, profileDTO.FirstName, profileDTO.LastName, profileDTO.DateOfBirth, profileDTO.Address, profileDTO.Role);
                
                byte[] picture;
                using (var memoryStream = new MemoryStream()) {
                    profileDTO.Picture.CopyTo(memoryStream);
                    picture = memoryStream.ToArray();
                }

                string token = await userServiceProxy.Register(user, picture);
                return Ok(token);
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpPost("log-in")]
        public async Task<IActionResult> LogIn([FromBody] LogInDTO logInDTO) {
            try {
                string token = await userServiceProxy.LogIn(logInDTO.Email, logInDTO.Password);
                return Ok(token);
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpPost("update")]
        [Authorize]
        public async Task<IActionResult> Update() {
            string username = GetUsernameFromToken();

            return Problem(statusCode: 500);
        }


        private string GetUsernameFromToken() {
            return User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

        }
    }
}
