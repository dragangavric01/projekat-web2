using WebUserCommon;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Client;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System;
using Microsoft.AspNetCore.Authorization;

namespace WebService.Controllers {
    [Route("rides")]
    [ApiController]
    [Authorize]
    public class RidesController : ControllerBase {
        private readonly IUserService rideServiceProxy = ServiceProxy.Create<IUserService>(new Uri("fabric:/ProjekatBack/RideService"), new ServicePartitionKey(0));

    }
}
