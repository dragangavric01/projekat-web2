using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Client;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System;
using WebUserCommon;

namespace WebService.Controllers {
    [Route("current-ride")]
    [ApiController]
    public class CurrentRideController : ControllerBase {
        private readonly IUserService rideServiceProxy = ServiceProxy.Create<IUserService>(new Uri("fabric:/ProjekatBack/RideService"), new ServicePartitionKey(0));

    }
}
