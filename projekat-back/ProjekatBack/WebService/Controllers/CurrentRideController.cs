using Common;
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
                Result<OrderRideReturnDTO> result = await rideServiceProxy.OrderRide(tokenExtractor.GetUsernameFromToken(User), orderRideDTO.StartAddress, orderRideDTO.DestinationAddress);

                return Ok(result);
            } catch {
                return Ok(new Result<OrderRideReturnDTO>(ResultMetadata.Exception));
            }
        }

        [HttpGet("confirm-ride")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> ConfirmRide() {
            try {
                Result<Period> result = await rideServiceProxy.ConfirmRide(tokenExtractor.GetUsernameFromToken(User));

                return Ok(result);
            } catch {
                return Ok(new Result<Period>(ResultMetadata.Exception));
            }
        }

        [HttpGet("cancel-ride")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> CancelRide() {
            try {
                ResultMetadata metadata = await rideServiceProxy.CancelRide(tokenExtractor.GetUsernameFromToken(User));

                return Ok(metadata);
            } catch {
                return Ok(ResultMetadata.Exception);
            }
        }

        [HttpGet("get-ride-status")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> GetRideStatus() {
            try {
                Result<RideStatus?> result = await rideServiceProxy.GetRideStatus(tokenExtractor.GetUsernameFromToken(User));

                return Ok(result);
            } catch {
                return Ok(new Result<RideStatus?>(ResultMetadata.Exception));
            }
        }

        [HttpPost("accept-ride")]
        [Authorize(Roles = "Driver")]
        public async Task<IActionResult> AcceptRide([FromBody] string rideRowKey) {
            try {
                Result<AcceptRideDTO> result = await rideServiceProxy.AcceptRide(tokenExtractor.GetUsernameFromToken(User), rideRowKey);

                return Ok(result);
            } catch {
                return Ok(new Result<AcceptRideDTO>(ResultMetadata.Exception));
            }
        }

        [HttpPost("rate-driver")]
        [Authorize(Roles = "Client")]
        public async Task<IActionResult> RateDriver([FromBody] int rating) {
            try {
                ResultMetadata metadata = await rideServiceProxy.RateDriver(tokenExtractor.GetUsernameFromToken(User), rating);

                return Ok(metadata);
            } catch {
                return Ok(ResultMetadata.Exception);
            }
        }
    }
}
