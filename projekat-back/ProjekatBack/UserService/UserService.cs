using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using WebUserCommon;
using UserService.Storage;
using System.IO;
using WebUserCommon.Model;
using WebUserCommon.DTO;
using Common;

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


        public async Task<Result<string>> Register(User user, byte[] picture) {
            try {
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                ResultMetadata metadata = userStorageManager.CreateUser(user, picture);
                if (metadata != ResultMetadata.Success) {
                    return new Result<string>(metadata);
                }

                if (user.Role == UserRole.Driver) {
                    if (!driverDataStorageManager.CreateDriverData(new DriverData(user.Username, RegistrationRequestStatus.Pending, false))) {
                        return new Result<string>(ResultMetadata.UsernameConflict);
                    }
                }

                Token token = new Token(secretKey, tokenIssuerURL, user.Username, user.Role);
                return new Result<string>(token.Content, ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<string>(ResultMetadata.Exception);
            }
        }

        public async Task<Result<string>> LogIn(string email, string password) {
            try {
                User user = userStorageManager.ReadUserByEmail(email);

                if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password)) {
                    return new Result<string>(ResultMetadata.LogInFailed);
                }

                Token token = new Token(secretKey, tokenIssuerURL, user.Username, user.Role);
                return new Result<string>(token.Content, ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<string>(ResultMetadata.Exception);
            }
        }

        public async Task<Result<ProfileDownloadDTO>> GetUser(string username) {
            try {
                User user = userStorageManager.ReadUser(username);

                byte[] picture = userStorageManager.ReadPictureBlob(username);

                return new Result<ProfileDownloadDTO>(new ProfileDownloadDTO(user.Username, user.Email, user.FirstName, user.LastName, user.DateOfBirth, user.Address, Convert.ToBase64String(picture)), ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<ProfileDownloadDTO>(ResultMetadata.Exception);
            }
        }

        public async Task<Result<string>> Update(string username, User user, byte[] picture) {
            try {
                if (user.Password != null) {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                }

                ResultMetadata metadata = userStorageManager.UpdateUser(username, user, picture);
                if (metadata != ResultMetadata.Success) {
                    return new Result<string>(metadata);
                }

                if (user.Role == UserRole.Driver) {
                    if (!driverDataStorageManager.UpdateDriversUsername(username, user.Username)) {
                        return new Result<string>(ResultMetadata.UsernameConflict);
                    }
                }

                if (username != user.Username) {
                    Token token = new Token(secretKey, tokenIssuerURL, user.Username, user.Role);
                    return new Result<string>(token.Content, ResultMetadata.Success);
                } else {
                    return new Result<string>(null, ResultMetadata.Success);
                }
            } catch (Exception ex) {
                return new Result<string>(ResultMetadata.Exception);
            }
        }

        public async Task<Result<GetStatusAndBlockedDTO>> GetRegistrationRequestStatusAndBlocked(string driverUsername) {
            try {
                DriverData driverData = driverDataStorageManager.ReadDriverData(driverUsername);

                return new Result<GetStatusAndBlockedDTO>(new GetStatusAndBlockedDTO(driverData), ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<GetStatusAndBlockedDTO>(ResultMetadata.Exception);
            }
        }


        public async Task<Result<List<DriverDataDTO>>> GetDrivers() {
            try {
                List<DriverData> driverDatas = driverDataStorageManager.ReadDriverDatas();

                List<DriverDataDTO> driverDataDTOs = new List<DriverDataDTO>();
                foreach (DriverData driverData in driverDatas) {
                    driverDataDTOs.Add(new DriverDataDTO(driverData));
                }

                return new Result<List<DriverDataDTO>>(driverDataDTOs, ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<List<DriverDataDTO>>(ResultMetadata.Exception);
            }
        }

        public async Task<Result<DriverDTO>> GetDriver(string driverUsername) {
            try {
                User user = userStorageManager.ReadUser(driverUsername);

                byte[] picture = userStorageManager.ReadPictureBlob(driverUsername);

                DriverData driverData = driverDataStorageManager.ReadDriverData(driverUsername);

                return new Result<DriverDTO>(new DriverDTO(user, Convert.ToBase64String(picture), driverData), ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<DriverDTO>(ResultMetadata.Exception);
            }
        }

        public async Task<ResultMetadata> AcceptDriversRegistrationRequest(string driverUsername) {
            try {
                driverDataStorageManager.UpdateDriversRegistrationRequestStatus(driverUsername, RegistrationRequestStatus.Accepted);

                return ResultMetadata.Success;
            } catch (Exception ex) {
                return ResultMetadata.Exception;
            }
        }

        public async Task<ResultMetadata> DenyDriversRegistrationRequest(string driverUsername) {
            try {
                driverDataStorageManager.UpdateDriversRegistrationRequestStatus(driverUsername, RegistrationRequestStatus.Denied);
                
                return ResultMetadata.Success;
            } catch (Exception ex) {
                return ResultMetadata.Exception;
            }
        }

        public async Task<ResultMetadata> BlockDriver(string driverUsername) {
            try {
                driverDataStorageManager.UpdateDriversBlocked(driverUsername, true);

                return ResultMetadata.Success;
            } catch (Exception ex) {
                return ResultMetadata.Exception;
            }
        }

        public async Task<ResultMetadata> UnblockDriver(string driverUsername) {
            try {
                driverDataStorageManager.UpdateDriversBlocked(driverUsername, false);

                return ResultMetadata.Success;
            } catch (Exception ex) {
                return ResultMetadata.Exception;
            }
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
