using Common.DTO;
using Common.Model;
using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Common.RemotingInterfaces
{
    public interface IUserService : IService
    {
        Task<FrontStateDTO> Register(User user);
        Task<string> LogIn(LogInDTO logInDTO);
        Task LogOut();
        Task<bool> Update();
    }
}
