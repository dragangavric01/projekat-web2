using Common.Model;
using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using WebUserCommon.DTO;
using WebUserCommon.Model;

namespace WebUserCommon {
    public interface IUserService : IService {
        Task<string> Register(User user, byte[] picture);
        Task<string> LogIn(string email, string password);
        Task<ProfileDownloadDTO> GetUser(string username);
        Task<string> Update(string username, User user, byte[] picture);
        Task<List<DriverDataDTO>> GetDrivers();
        Task<DriverDTO> GetDriver(string driverUsername);
    }
}
