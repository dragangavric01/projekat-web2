using Common;
using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using UserService.Storage;
using WebUserCommon.DTO;
using WebUserCommon.Model;

namespace WebUserCommon {
    public interface IUserService : IService {
        Task<Result<string>> Register(User user, byte[] picture);
        Task<Result<string>> LogIn(string email, string password);
        Task<Result<ProfileDownloadDTO>> GetUser(string username);
        Task<Result<string>> Update(string username, User user, byte[] picture);
        Task<Result<GetStatusAndBlockedDTO>> GetRegistrationRequestStatusAndBlocked(string driverUsername);
        Task<Result<List<DriverDataDTO>>> GetDrivers();
        Task<Result<DriverDTO>> GetDriver(string driverUsername);
        Task<ResultMetadata> AcceptDriversRegistrationRequest(string driverUsername);
        Task<ResultMetadata> DenyDriversRegistrationRequest(string driverUsername);
        Task<ResultMetadata> BlockDriver(string driverUsername);
        Task<ResultMetadata> UnblockDriver(string driverUsername);
    }
}
