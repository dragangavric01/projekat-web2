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
using UserService.Storage;
using System.IO;
using WebUserCommon.Model;
using WebUserCommon.DTO;

namespace UserService
{
    /// <summary>
    /// An instance of this class is created for each service instance by the Service Fabric runtime.
    /// </summary>
    internal sealed class UserService : StatelessService, IUserService {
        string secretKey;
        string tokenIssuerURL;
        UserStorageManager userStorageManager = new UserStorageManager();
        DriverDataStorageManager driverDataStorageManager = new DriverDataStorageManager();

        public UserService(StatelessServiceContext context) : base(context) {
            IConfigurationBuilder builder = new ConfigurationBuilder().AddJsonFile("appsettings.json");
            IConfiguration configuration = builder.Build();

            secretKey = configuration["SecretKey"];
            tokenIssuerURL = configuration["TokenIssuerURL"];
        }


        public async Task<string> Register(User user, byte[] picture) {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            if (!userStorageManager.CreateUser(user, picture)) {
                return null;
            }

            if (user.Role == UserRole.Driver) {
                if (!driverDataStorageManager.CreateDriverData(new DriverData(user.Username, RegistrationRequestStatus.Pending, false))) {
                    return null;
                }
            }

            Token token = new Token(secretKey, tokenIssuerURL, user.Username, user.Role);
            return token.Content;
        }

        public async Task<string> LogIn(string email, string password) {
            User user = userStorageManager.ReadUserByEmail(email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password)) {
                return null;
            }

            Token token = new Token(secretKey, tokenIssuerURL, user.Username, user.Role);
            return token.Content;
        }

        public async Task<ProfileDownloadDTO> GetUser(string username) {
            User user = userStorageManager.ReadUser(username);
            if (user == null) {
                return null;
            }

            byte[] picture = userStorageManager.ReadPictureBlob(username);

            return new ProfileDownloadDTO(user.Username, user.Email, user.FirstName, user.LastName, user.DateOfBirth, user.Address, Convert.ToBase64String(picture));
        }

        public async Task<string> Update(string username, User user, byte[] picture) {
            if (user.Password != null) {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            }

            bool success = userStorageManager.UpdateUser(username, user, picture);

            if (!success) {
                return null;
            }

            if (username != user.Username) {
                Token token = new Token(secretKey, tokenIssuerURL, user.Username, user.Role);
                return token.Content;
            } else {
                return "";
            }
        }
        
        public async Task<List<DriverDataDTO>> GetDrivers() {
            List<DriverData> driverDatas = driverDataStorageManager.ReadDriverDatas();

            List<DriverDataDTO> driverDataDTOs = new List<DriverDataDTO>();
            foreach (DriverData driverData in driverDatas) {
                driverDataDTOs.Add(new DriverDataDTO(driverData));
            }

            return driverDataDTOs;
        }

        public async Task<DriverDTO> GetDriver(string driverUsername) {
            User user = userStorageManager.ReadUser(driverUsername);
            if (user == null) {
                return null;
            }

            byte[] picture = userStorageManager.ReadPictureBlob(driverUsername);

            DriverData driverData = driverDataStorageManager.ReadDriverData(driverUsername);

            return new DriverDTO(user, Convert.ToBase64String(picture), driverData);
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
