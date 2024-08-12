using Common.Model;
using Microsoft.ServiceFabric.Data;
using Microsoft.ServiceFabric.Data.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RideService {
    public class CurrentRideClientStateHandler {
        IReliableStateManager stateManager;

        public CurrentRideClientStateHandler(IReliableStateManager stateManager) {
            this.stateManager = stateManager;
        }

        public async Task Create(string username, CurrentRideClientState currentRideClientState) {
            IReliableDictionary<string, CurrentRideClientState> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, CurrentRideClientState>>("currentrides");

            try {
                using (ITransaction tx = this.stateManager.CreateTransaction()) {
                    // AddAsync takes key's write lock; if >4 secs, TimeoutException
                    await dict.AddAsync(tx, username, currentRideClientState);

                    // After quorum responds, all locks released
                    await tx.CommitAsync();
                }
            } catch (TimeoutException) {
                // retry after delay because you couldn't get a lock on the file because it already in use. 
                await Task.Delay(100);
                await Create(username, currentRideClientState);
            }
        }

        public async Task<CurrentRideClientState> Read(string username) {
            IReliableDictionary<string, CurrentRideClientState> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, CurrentRideClientState>>("currentrides");

            try {
                using (ITransaction tx = this.stateManager.CreateTransaction()) {
                    ConditionalValue<CurrentRideClientState> result = await dict.TryGetValueAsync(tx, username);

                    if (result.HasValue) {
                        return result.Value;
                    }

                    return null;
                }
            } catch (TimeoutException) {
                await Task.Delay(100);
                return await Read(username);
            }
        }

        public async Task Delete(string username) {
            IReliableDictionary<string, CurrentRideClientState> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, CurrentRideClientState>>("currentrides");

            try {
                using (ITransaction tx = this.stateManager.CreateTransaction()) {
                    if (await dict.ContainsKeyAsync(tx, username)) {
                        await dict.TryRemoveAsync(tx, username);
                        await tx.CommitAsync();
                    }
                }
            } catch (TimeoutException) {
                await Task.Delay(100);
                await Delete(username);
            }
        }
    }

    public class CurrentRideClientState {
        public string RideId  {get; set; }
        public string StartAddress { get; set; }
        public string DestinationAddress { get; set; }
        public float Price { get; set; }
        public int WaitTimeInMinutes { get; set; }
    }
}
