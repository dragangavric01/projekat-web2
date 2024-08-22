using WebUserCommon;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Client;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System;
using Microsoft.AspNetCore.Authorization;
using RideService;
using System.Threading.Tasks;
using WebRideCommon.DTO;
using System.Collections.Generic;
using WebRideCommon.Model;
using Common;

namespace WebService.Controllers {
    [Route("rides")]
    [ApiController]
    [Authorize]
    public class RidesController : ControllerBase {
        private readonly IRideService rideServiceProxy = ServiceProxy.Create<IRideService>(new Uri("fabric:/ProjekatBack/RideService"), new ServicePartitionKey(0));
        TokenExtractor tokenExtractor = new TokenExtractor();

        [HttpGet("get-requested-rides")]
        [Authorize(Roles = "Driver")]
        public async Task<IActionResult> GetRequestedRides() {
            try {
                Result<List<RequestedRideDTO>> result = await rideServiceProxy.GetRequestedRides();

                return Ok(result);
            } catch {
                return Ok(new Result<List<RequestedRideDTO>>(ResultMetadata.Exception));
            }
        }

        [HttpGet("get-users-rides")]
        [Authorize(Roles = "Client,Driver")]
        public async Task<IActionResult> GetUsersRides() {
            try {
                Result<List<UsersRideDTO>> result = await rideServiceProxy.GetUsersRides(tokenExtractor.GetUsernameFromToken(User));

                return Ok(result);
            } catch {
                return Ok(new Result<List<UsersRideDTO>>(ResultMetadata.Exception));
            }
        }

        [HttpGet("get-rides")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRides() {
            try {
                Result<List<RideDTO>> result = await rideServiceProxy.GetRides();

                return Ok(result);
            } catch {
                return Ok(new Result<List<RideDTO>>(ResultMetadata.Exception));
            }
        }

        [HttpPost("get-drivers-average-rating")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDriversAverageRating([FromBody] string driversUsername) {
            try {
                Result<double> result = await rideServiceProxy.GetDriversAverageRating(driversUsername);

                return Ok(result);
            } catch {
                return Ok(new Result<double>(ResultMetadata.Exception));
            }
        }
    }
}
