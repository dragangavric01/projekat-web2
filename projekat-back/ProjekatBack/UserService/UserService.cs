using System;
using System.Collections.Generic;
using System.Fabric;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Common;
using Common.DTO;
using Common.Model;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Microsoft.ServiceFabric.Data;
using Microsoft.ServiceFabric.Data.Collections;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using Microsoft.Extensions.Configuration;

namespace UserService {
    /// <summary>
    /// An instance of this class is created for each service replica by the Service Fabric runtime.
    /// </summary>
    internal sealed class UserService : StatefulService, IUserService {
        UserState userState;
        string secretKey;
        TokenHandler tokenHandler = new TokenHandler();

        public UserService(StatefulServiceContext context) : base(context) {
            userState = new UserState(this.StateManager);
            IConfigurationBuilder builder = new ConfigurationBuilder().AddJsonFile("appsettings.json");
            IConfiguration configuration = builder.Build();
            secretKey = configuration["SecretKey"];
        }

        
        public async Task<FrontStateDTO> Register(User user) {
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

            return tokenHandler.CreateToken(secretKey, "njegov_username", "Client");



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

        public async Task Update() {
        }



        /// <summary>
        /// Optional override to create listeners (e.g., HTTP, Service Remoting, WCF, etc.) for this service replica to handle client or user requests.
        /// </summary>
        /// <remarks>
        /// For more information on service communication, see https://aka.ms/servicefabricservicecommunication
        /// </remarks>
        /// <returns>A collection of listeners.</returns>
        protected override IEnumerable<ServiceReplicaListener> CreateServiceReplicaListeners() {
            //return new ServiceReplicaListener[0];
            return this.CreateServiceRemotingReplicaListeners();
        }

        /// <summary>
        /// This is the main entry point for your service replica.
        /// This method executes when this replica of your service becomes primary and has write status.
        /// </summary>
        /// <param name="cancellationToken">Canceled when Service Fabric needs to shut down this service replica.</param>
        protected override async Task RunAsync(CancellationToken cancellationToken) {
            // TODO: Replace the following sample code with your own logic 
            //       or remove this RunAsync override if it's not needed in your service.

            var myDictionary = await this.StateManager.GetOrAddAsync<IReliableDictionary<string, long>>("myDictionary");

            while (true) {
                cancellationToken.ThrowIfCancellationRequested();

                using (var tx = this.StateManager.CreateTransaction()) {
                    var result = await myDictionary.TryGetValueAsync(tx, "Counter");

                    ServiceEventSource.Current.ServiceMessage(this.Context, "Current Counter Value: {0}",
                        result.HasValue ? result.Value.ToString() : "Value does not exist.");

                    await myDictionary.AddOrUpdateAsync(tx, "Counter", 0, (key, value) => ++value);

                    // If an exception is thrown before calling CommitAsync, the transaction aborts, all changes are 
                    // discarded, and nothing is saved to the secondary replicas.
                    await tx.CommitAsync();
                }

                await Task.Delay(TimeSpan.FromSeconds(1), cancellationToken);
            }
        }
    }
}
