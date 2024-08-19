using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Client;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using RideService;
using System;
using System.Threading.Tasks;
using WebRideCommon;
using WebRideCommon.DTO;
using WebRideCommon.Model;
using WebUserCommon;
using WebUserCommon.DTO;

namespace WebService.Controllers {
    [Route("current-ride")]
    [ApiController]
    [Authorize]
    public class CurrentRideController : ControllerBase {
        private readonly IRideService rideServiceProxy = ServiceProxy.Create<IRideService>(new Uri("fabric:/ProjekatBack/RideService"), new ServicePartitionKey(0));
        TokenExtractor tokenExtractor = new TokenExtractor();

        [HttpPost("order-ride")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> OrderRide([FromBody] OrderRideDTO orderRideDTO) {
            try {
                OrderRideReturnDTO orderRideReturnDTO = await rideServiceProxy.OrderRide(tokenExtractor.GetUsernameFromToken(User), orderRideDTO.StartAddress, orderRideDTO.DestinationAddress);
                return Ok(orderRideReturnDTO);
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpGet("confirm-ride")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> ConfirmRide() {
            try {
                Period duration = await rideServiceProxy.ConfirmRide(tokenExtractor.GetUsernameFromToken(User));
                return Ok(duration);
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpGet("cancel-ride")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> CancelRide() {
            try {
                await rideServiceProxy.CancelRide(tokenExtractor.GetUsernameFromToken(User));
                return Ok();
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpGet("get-ride-status")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> GetRideStatus() {
            try {
                RideStatus? rideStatus = await rideServiceProxy.GetRideStatus(tokenExtractor.GetUsernameFromToken(User));
                return Ok(rideStatus);
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpPost("accept-ride")]
        [Authorize(Roles = "Driver")]
        public async Task<IActionResult> AcceptRide([FromBody] string rideRowKey) {
            try {
                AcceptRideDTO acceptRideDTO = await rideServiceProxy.AcceptRide(tokenExtractor.GetUsernameFromToken(User), rideRowKey);
                return Ok(acceptRideDTO);
            } catch {
                return Problem(statusCode: 500);
            }
        }

        [HttpPost("rate-driver")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> RateDriver([FromBody] int rating) {
            try {
                await rideServiceProxy.RateDriver(tokenExtractor.GetUsernameFromToken(User), rating);
                return Ok();
            } catch {
                return Problem(statusCode: 500);
            }
        }
    }
}
