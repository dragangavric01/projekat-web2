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
                List<RequestedRideDTO> requestedRides = await rideServiceProxy.GetRequestedRides();
                return Ok(requestedRides);
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpGet("get-users-rides")]
        [Authorize(Roles = "Client,Driver")]
        public async Task<IActionResult> GetUsersRides() {
            try {
                List<UsersRideDTO> usersRides = await rideServiceProxy.GetUsersRides(tokenExtractor.GetUsernameFromToken(User));
                return Ok(usersRides);
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpGet("get-rides")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRides() {
            try {
                List<RideDTO> rides = await rideServiceProxy.GetRides();
                return Ok(rides);
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpPost("get-drivers-average-rating")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDriversAverageRating([FromBody] string driversUsername) {
            try {
                double result = await rideServiceProxy.GetDriversAverageRating(driversUsername);
                return Ok(result);
            } catch {
                return Problem(statusCode: 500);
            }
        }
    }
}
