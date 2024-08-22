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
using Common;

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
                Result<List<DriverDataDTO>> result = await userServiceProxy.GetDrivers();

                return Ok(result);
            } catch {
                return Ok(new Result<List<DriverDataDTO>>(ResultMetadata.Exception));
            }
        }

        [HttpPost("get-driver")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDriver([FromBody] string driverUsername) {
            try {
                Result<DriverDTO> result = await userServiceProxy.GetDriver(driverUsername);

                return Ok(result);
            } catch {
                return Ok(new Result<DriverDTO>(ResultMetadata.Exception));
            }
        }

        [HttpPost("accept-drivers-registration-request")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AcceptDriversRegistrationRequest([FromBody] string driverUsername) {
            try {
                ResultMetadata metadata = await userServiceProxy.AcceptDriversRegistrationRequest(driverUsername);

                return Ok(metadata);
            } catch {
                return Ok(ResultMetadata.Exception);
            }
        }

        [HttpPost("deny-drivers-registration-request")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DenyDriversRegistrationRequest([FromBody] string driverUsername) {
            try {
                ResultMetadata metadata = await userServiceProxy.DenyDriversRegistrationRequest(driverUsername);

                return Ok(metadata);
            } catch {
                return Ok(ResultMetadata.Exception);
            }
        }

        [HttpPost("block-driver")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> BlockDriver([FromBody] string driverUsername) {
            try {
                ResultMetadata metadata = await userServiceProxy.BlockDriver(driverUsername);

                return Ok(metadata);
            } catch {
                return Ok(ResultMetadata.Exception);
            }
        }

        [HttpPost("unblock-driver")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UnblockDriver([FromBody] string driverUsername) {
            try {
                ResultMetadata metadata = await userServiceProxy.UnblockDriver(driverUsername);

                return Ok(metadata);
            } catch {
                return Ok(ResultMetadata.Exception);
            }
        }
    }
}
