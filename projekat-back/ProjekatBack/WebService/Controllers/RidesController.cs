using WebUserCommon;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Client;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System;

namespace WebService.Controllers {
    [Route("rides")]
    [ApiController]
    public class RidesController : ControllerBase {
        private readonly IUserService rideServiceProxy = ServiceProxy.Create<IUserService>(new Uri("fabric:/ProjekatBack/RideService"), new ServicePartitionKey(0));

    }
}
