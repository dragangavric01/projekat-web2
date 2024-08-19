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
        TokenExtractor tokenExtractor = new TokenExtractor();

       [HttpPost("register")]
       public async Task<IActionResult> Register([FromForm] ProfileUploadDTO profileDTO) {
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

        [Authorize]
        [HttpGet("get-profile")]
        public async Task<IActionResult> GetProfile() {
            try {
                ProfileDownloadDTO profileDTO = await userServiceProxy.GetUser(tokenExtractor.GetUsernameFromToken(User));
                return Ok(profileDTO);
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpPost("update")]
        [Authorize]
        public async Task<IActionResult> Update([FromForm] ProfileUploadDTO profileDTO) {
            try {
                User user = new User(ValueOrNull(profileDTO.Username), ValueOrNull(profileDTO.Email), ValueOrNull(profileDTO.Password), ValueOrNull(profileDTO.FirstName), ValueOrNull(profileDTO.LastName), ValueOrNull(profileDTO.DateOfBirth), ValueOrNull(profileDTO.Address), tokenExtractor.GetRoleFromToken(User));

                byte[] picture;

                if (profileDTO.Picture != null) {
                    using (var memoryStream = new MemoryStream()) {
                        profileDTO.Picture.CopyTo(memoryStream);
                        picture = memoryStream.ToArray();
                    }
                } else {
                    picture = null;
                }
                
                string result = await userServiceProxy.Update(tokenExtractor.GetUsernameFromToken(User), user, picture);
                return Ok(result);
            } catch {
                return Problem(statusCode: 500);
            }
        }


        private string ValueOrNull(string value) {
            if (value == "null") {
                return null;
            } else {
                return value;
            }
        }
    }
}
