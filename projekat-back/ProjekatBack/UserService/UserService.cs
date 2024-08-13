using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Common.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebUserCommon;
using WebUserCommon.DTO;
using UserService.Storage;

namespace UserService
{
    /// <summary>
    /// An instance of this class is created for each service instance by the Service Fabric runtime.
    /// </summary>
    internal sealed class UserService : StatelessService, IUserService {
        string secretKey;
        string tokenIssuerURL;
        UserStorageManager userStorageManager = new UserStorageManager();

        public UserService(StatelessServiceContext context) : base(context) {
            IConfigurationBuilder builder = new ConfigurationBuilder().AddJsonFile("appsettings.json");
            IConfiguration configuration = builder.Build();
            secretKey = configuration["SecretKey"];
            tokenIssuerURL = configuration["TokenIssuerURL"];
        }


        public async Task<string> Register() {
            return null;

            /*
            if (dbHandler.Create(user)) {
                userState.Create(user.Username, user.Role);
                return new FrontStateDTO() { Username = user.Username, Role = user.Role };
            }
            */
        }

        public async Task<string> LogIn(LogInDTO logInDTO) {
            if (logInDTO.Email != "a@" || logInDTO.Password != "123") {
                return null;
            }

            Token token = new Token(secretKey, tokenIssuerURL, "njegov_username", "Client");
            return token.Content;



            /*
            User user = dbHandler.Read(logInDTO.Username);
            if (user != null && loginDTO.Password == user.Password) {
                userState.Create(user.Username, user.Role);
                return new FrontStateDTO() { Username = user.Username, Role = user.Role };
            }

            return null;
            */
        }

        public async Task LogOut() {

        }

        public async Task<bool> Update() {
            return false;
        }



        /// <summary>
        /// Optional override to create listeners (e.g., TCP, HTTP) for this service replica to handle client or user requests.
        /// </summary>
        /// <returns>A collection of listeners.</returns>
        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners() {
            //return new ServiceInstanceListener[0];
            return this.CreateServiceRemotingInstanceListeners();
        }

        /// <summary>
        /// This is the main entry point for your service instance.
        /// </summary>
        /// <param name="cancellationToken">Canceled when Service Fabric needs to shut down this service instance.</param>
        protected override async Task RunAsync(CancellationToken cancellationToken) {
            // TODO: Replace the following sample code with your own logic 
            //       or remove this RunAsync override if it's not needed in your service.

            long iterations = 0;

            while (true) {
                cancellationToken.ThrowIfCancellationRequested();

                ServiceEventSource.Current.ServiceMessage(this.Context, "Working-{0}", ++iterations);

                await Task.Delay(TimeSpan.FromSeconds(1), cancellationToken);
            }
        }
    }
}
