using Common.DTO;
using Common.Model;
using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Common {
    public interface IUserService : IService {
        FrontStateDTO Register(User user);
        string LogIn(LogInDTO logInDTO);
        void LogOut();
        bool Update();
    }
}
