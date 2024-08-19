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
        Task<OrderRideReturnDTO> OrderRide(string clientUsername, string startAddress, string destinationAddress);
        Task<Period> ConfirmRide(string clientUsername);
        Task CancelRide(string clientUsername);
        Task<RideStatus?> GetRideStatus(string clientUsername);
        Task<List<RequestedRideDTO>> GetRequestedRides();
        Task<AcceptRideDTO> AcceptRide(string driverUsername, string rideRowKey);
        Task RateDriver(string clientUsername, int rating);
        Task<List<UsersRideDTO>> GetUsersRides(string username);
    }
}
