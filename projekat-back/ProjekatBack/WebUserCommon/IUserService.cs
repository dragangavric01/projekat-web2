using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using WebUserCommon.DTO;

namespace WebUserCommon {
    public interface IUserService : IService {
        Task<string> Register();
        Task<string> LogIn(LogInDTO logInDTO);
        Task LogOut();
        Task<bool> Update();
    }
}
