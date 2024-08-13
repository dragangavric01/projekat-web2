using Microsoft.AspNetCore.Mvc;
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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebService.Controllers
{
    [Route("current-user")]
    [ApiController]
    public class CurrentUserController : ControllerBase {
        private readonly IUserService userServiceProxy = ServiceProxy.Create<IUserService>(new Uri("fabric:/ProjekatBack/UserService"));

        [HttpPost("register")]
       public async Task<ActionResult> Register() {
            return null;
        }

        [HttpPost("log-in")]
        public async Task<ActionResult> LogIn([FromBody] LogInDTO logInDTO) {
            try {
                string token = await userServiceProxy.LogIn(logInDTO);
                return Ok(token);
            } catch {
                return Problem();
            }
        }

        [HttpGet("log-out")]
        public async Task LogOut() {
            
        }

        [HttpPost("update")]
        public async Task<ActionResult> Update() {
            string username = GetUsernameFromToken();

            return Problem();

        }



        private string GetUsernameFromToken() {
            return User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

        }
    }
}
