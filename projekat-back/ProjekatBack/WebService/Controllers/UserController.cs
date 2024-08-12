using Common.DTO;
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
using Common.RemotingInterfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebService.Controllers
{
    [Route("users")]
    [ApiController]
    public class UserController : ControllerBase {
        private readonly IUserService userServiceProxy = ServiceProxy.Create<IUserService>(new Uri("fabric:/ProjekatBack/UserService"), new ServicePartitionKey(0));

        [HttpPost("register")]
        Task<FrontStateDTO> Register(User user) {
            return null;
        }

        [HttpPost("log-in")]
        public async Task<IActionResult> LogIn([FromBody] LogInDTO logInDTO) {
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
        public async Task<bool> Update() {
            string username = GetUsernameFromToken();

            return false;

        }

        [HttpPost("get-drivers")]
        [Authorize(Roles = "Admin")]
        public async Task GetDrivers() {

        }


        private string GetUsernameFromToken() {
            return User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

        }



        // GET: users
        [HttpGet]
        public IEnumerable<string> Get() {
            return new string[] { "value1", "value2" };
        }

        // GET users/5
        [HttpGet("{id}")]
        public string Get(int id) {
            return "value";
        }

        // POST users
        [HttpPost]
        public void Post([FromBody] string value) {
        }

        // PUT users/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value) {
        }

        // DELETE users/5
        [HttpDelete("{id}")]
        public void Delete(int id) {
        }
    }
}
