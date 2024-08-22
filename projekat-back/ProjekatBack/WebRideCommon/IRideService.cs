using Common;
using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebRideCommon;
using WebRideCommon.DTO;
using WebRideCommon.Model;

namespace RideService {
    public interface IRideService : IService {
        Task<Result<OrderRideReturnDTO>> OrderRide(string clientUsername, string startAddress, string destinationAddress);
        Task<Result<Period>> ConfirmRide(string clientUsername);
        Task<ResultMetadata> CancelRide(string clientUsername);
        Task<Result<RideStatus?>> GetRideStatus(string clientUsername);
        Task<Result<List<RequestedRideDTO>>> GetRequestedRides();
        Task<Result<AcceptRideDTO>> AcceptRide(string driverUsername, string rideRowKey);
        Task<ResultMetadata> RateDriver(string clientUsername, int rating);
        Task<Result<List<UsersRideDTO>>> GetUsersRides(string username);
        Task<Result<List<RideDTO>>> GetRides();
        Task<Result<double>> GetDriversAverageRating(string driverUsername);
    }
}
