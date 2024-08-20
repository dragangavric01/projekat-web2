using WebUserCommon;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using WebRideCommon.DTO;
using WebUserCommon.DTO;

namespace WebService.Controllers {
    [Route("users")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase {
        private readonly IUserService userServiceProxy = ServiceProxy.Create<IUserService>(new Uri("fabric:/ProjekatBack/UserService"));

        [HttpGet("get-drivers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDrivers() {
            try {
                List<DriverDataDTO> drivers = await userServiceProxy.GetDrivers();
                return Ok(drivers);
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpPost("get-driver")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDriver([FromBody] string driverUsername) {
            try {
                DriverDTO driver = await userServiceProxy.GetDriver(driverUsername);
                return Ok(driver);
            } catch {
                return Problem(statusCode: 500);
            }
        }
    }
}
