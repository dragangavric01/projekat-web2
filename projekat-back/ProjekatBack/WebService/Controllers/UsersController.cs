using WebUserCommon;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using System;
using System.Threading.Tasks;

namespace WebService.Controllers {
    [Route("users")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase {
        private readonly IUserService userServiceProxy = ServiceProxy.Create<IUserService>(new Uri("fabric:/ProjekatBack/UserService"));

        [HttpGet("get-drivers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetDrivers() {
            return Problem(statusCode: 500);
        }
    }
}
