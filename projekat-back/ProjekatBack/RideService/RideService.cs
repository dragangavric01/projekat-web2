using System;
using System.Collections.Generic;
using System.Fabric;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.ServiceFabric.Data.Collections;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using Microsoft.ServiceFabric.Services.Runtime;
using Microsoft.ServiceFabric.Services.Remoting.Runtime;
using WebRideCommon;
using WebRideCommon.DTO;
using RideService.State;
using WebRideCommon.Model;
using RideService.Storage;
using Common;

namespace RideService
{
    /// <summary>
    /// An instance of this class is created for each service replica by the Service Fabric runtime.
    /// </summary>
    internal sealed class RideService : StatefulService, IRideService {
        OrderedRideStateManager orderedRideStateManager;
        ConfirmedRideStateManager confirmedRideStateManager;
        RideCalculator rideCalculator;
        RideStorageManager rideStorageManager;

        public RideService(StatefulServiceContext context) : base(context) {
            orderedRideStateManager = new OrderedRideStateManager(this.StateManager);
            confirmedRideStateManager = new ConfirmedRideStateManager(this.StateManager);
            rideCalculator = new RideCalculator();
            rideStorageManager = new RideStorageManager();
        }

        public async Task<Result<OrderRideReturnDTO>> OrderRide(string clientUsername, string startAddress, string destinationAddress) {
            try {
                OrderRideReturnDTO orderRideReturnDTO = new OrderRideReturnDTO(rideCalculator.GetRidePrice(startAddress, destinationAddress), rideCalculator.GetRideWaitTime(startAddress, destinationAddress));

                // Delete the state if it the user has ordered a ride before this one but hasn't confirmed it nor canceled it
                if (await orderedRideStateManager.ReadState(clientUsername) != null) {
                    await orderedRideStateManager.DeleteState(clientUsername);  
                }
                await orderedRideStateManager.CreateState(clientUsername, new OrderedRide(startAddress, destinationAddress, orderRideReturnDTO.Price, orderRideReturnDTO.WaitTime));

                Task.Run(() => DeleteOrderedRideStateAfter5Min(clientUsername));

                return new Result<OrderRideReturnDTO>(orderRideReturnDTO, ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<OrderRideReturnDTO>(ResultMetadata.Exception);
            }
        }

        public async Task<Result<Period>> ConfirmRide(string clientUsername) {
            try {
                OrderedRide orderedRide = await orderedRideStateManager.ReadState(clientUsername);

                await orderedRideStateManager.DeleteState(clientUsername);

                Period duration = rideCalculator.GetRideDuration(orderedRide.StartAddress, orderedRide.DestinationAddress);

                Ride ride = new Ride(DateTime.Now.ToString(), orderedRide.StartAddress, orderedRide.DestinationAddress, orderedRide.Price, "", clientUsername, RideStatus.Requested, orderedRide.WaitTime.ToString(), duration.ToString(), -1);
                string rideRowKey = rideStorageManager.CreateRide(ride);


                if (await confirmedRideStateManager.ReadState(clientUsername) != null) {
                    await confirmedRideStateManager.DeleteState(clientUsername);
                }
                await confirmedRideStateManager.CreateState(clientUsername, rideRowKey);

                return new Result<Period>(duration, ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<Period>(ResultMetadata.Exception);
            }
        }

        public async Task<ResultMetadata> CancelRide(string clientUsername) {
            try {
                if (await orderedRideStateManager.ReadState(clientUsername) != null) {
                    await orderedRideStateManager.DeleteState(clientUsername);
                }

                return ResultMetadata.Success;
            } catch (Exception ex) {
                return ResultMetadata.Exception;
            }
        }

        public async Task<Result<RideStatus?>> GetRideStatus(string clientUsername) {
            try {
                string rideRowKey = await confirmedRideStateManager.ReadState(clientUsername);

                Ride ride = rideStorageManager.ReadRide(rideRowKey);

                return new Result<RideStatus?>(ride.Status, ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<RideStatus?>(ResultMetadata.Exception);
            }
        }

        public async Task<Result<List<RequestedRideDTO>>> GetRequestedRides() {
            try {
                List<Ride> requestedRides = rideStorageManager.ReadRequestedRides();

                List<RequestedRideDTO> requestedRideDTOs = new List<RequestedRideDTO>();
                foreach (Ride ride in requestedRides) {
                    requestedRideDTOs.Add(new RequestedRideDTO(ride));
                }

                return new Result<List<RequestedRideDTO>>(requestedRideDTOs, ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<List<RequestedRideDTO>>(ResultMetadata.Exception);
            }
        }

        public async Task<Result<AcceptRideDTO>> AcceptRide(string driverUsername, string rideRowKey) {
            try {
                Ride ride = rideStorageManager.ReadRide(rideRowKey);
                Period waitTime = new Period(ride.WaitTime);
                Period rideDuration = new Period(ride.Duration);

                if (ride.Status == RideStatus.InProgress) {  // if some other driver has already accepted it 
                    return new Result<AcceptRideDTO>(ResultMetadata.AlreadyAccepted);
                }

                rideStorageManager.UpdateRideStatusAndDriverUsername(rideRowKey, RideStatus.InProgress, driverUsername);

                Task.Run(() => Cleanup(ride.ClientUsername, waitTime, rideDuration, rideRowKey));

                return new Result<AcceptRideDTO>(new AcceptRideDTO(waitTime, rideDuration), ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<AcceptRideDTO>(ResultMetadata.Exception);
            }
        }

        public async Task<ResultMetadata> RateDriver(string clientUsername, int rating) {
            try {

                string rideRowKey = await confirmedRideStateManager.ReadState(clientUsername);

                if (rideRowKey != null) {  // If state isn't already deleted by Cleanup()
                    rideStorageManager.UpdateRideRating(rideRowKey, rating);

                    await confirmedRideStateManager.DeleteState(clientUsername);
                }
            
                return ResultMetadata.Success;
            } catch (Exception ex) {
                return ResultMetadata.Exception;
            }
        }

        public async Task<Result<List<UsersRideDTO>>> GetUsersRides(string username) {
            try {
                List<Ride> usersRides = rideStorageManager.ReadUsersRides(username);

                List<UsersRideDTO> usersRideDTOs = new List<UsersRideDTO>();
                foreach (Ride ride in usersRides) {
                    usersRideDTOs.Add(new UsersRideDTO(ride));
                }

                return new Result<List<UsersRideDTO>>(usersRideDTOs, ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<List<UsersRideDTO>>(ResultMetadata.Exception);
            }
        }

        public async Task<Result<List<RideDTO>>> GetRides() {
            try {
                List<Ride> rides = rideStorageManager.ReadRides();

                List<RideDTO> rideDTOs = new List<RideDTO>();
                foreach (Ride ride in rides) {
                    rideDTOs.Add(new RideDTO(ride));
                }

                return new Result<List<RideDTO>>(rideDTOs, ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<List<RideDTO>>(ResultMetadata.Exception);
            }
        }

        public async Task<Result<double>> GetDriversAverageRating(string driverUsername) {
            try {
                List<Ride> usersRides = rideStorageManager.ReadUsersRides(driverUsername);

                int ratingSum = 0;
                int numberOfRatings = 0;
                foreach (Ride ride in usersRides) {
                    if (ride.DriverRating != -1) {
                        ratingSum += ride.DriverRating;
                        numberOfRatings++;
                    }
                }

                if (numberOfRatings == 0) {
                    return new Result<double>(0, ResultMetadata.Success);
                }

                return new Result<double>(Math.Round((double)ratingSum / (double)numberOfRatings, 2), ResultMetadata.Success);
            } catch (Exception ex) {
                return new Result<double>(ResultMetadata.Exception);
            }
        }


        private async void DeleteOrderedRideStateAfter5Min(string clientUsername) {
            try {
                await Task.Delay(new Period(5, 0).ToMilliseconds());

                if (await orderedRideStateManager.ReadState(clientUsername) != null) {
                    await orderedRideStateManager.DeleteState(clientUsername);
                }
            } catch (Exception) {

            }
        }

        private async void Cleanup(string clientUsername, Period waitTime, Period rideDuration, string rideRowKey) {
            try {
               await Task.Delay(waitTime.ToMilliseconds() + rideDuration.ToMilliseconds());
                rideStorageManager.UpdateRideStatus(rideRowKey, RideStatus.Finished);

                await Task.Delay(new Period(10, 0).ToMilliseconds());
                if (await confirmedRideStateManager.ReadState(clientUsername) != null) {
                    await confirmedRideStateManager.DeleteState(clientUsername);
                } 
            } catch (Exception) {

            }
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
