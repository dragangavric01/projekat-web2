using Microsoft.ServiceFabric.Data.Collections;
using Microsoft.ServiceFabric.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RideService.State {
    public class ConfirmedRideStateManager {
        IReliableStateManager stateManager;
        string reliableDictName = "confirmedrides";

        public ConfirmedRideStateManager(IReliableStateManager stateManager) {
            this.stateManager = stateManager;
        }

        public async Task CreateState(string clientUsername, string rideRowKey) {
            IReliableDictionary<string, string> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, string>>(reliableDictName);

            try {
                using (ITransaction tx = stateManager.CreateTransaction()) {
                    // AddAsync takes key's write lock; if >4 secs, TimeoutException
                    await dict.AddAsync(tx, clientUsername, rideRowKey);

                    // After quorum responds, all locks released
                    await tx.CommitAsync();
                }
            } catch (TimeoutException) {
                // retry after delay because you couldn't get a lock on the file because it already in use. 
                await Task.Delay(100);
                await CreateState(clientUsername, rideRowKey);
            }
        }

        public async Task<string> ReadState(string clientUsername) {
            IReliableDictionary<string, string> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, string>>(reliableDictName);

            try {
                using (ITransaction tx = stateManager.CreateTransaction()) {
                    ConditionalValue<string> result = await dict.TryGetValueAsync(tx, clientUsername);

                    if (result.HasValue) {
                        return result.Value;
                    }

                    return null;
                }
            } catch (TimeoutException) {
                await Task.Delay(100);
                return await ReadState(clientUsername);
            }
        }

        public async Task DeleteState(string clientUsername) {
            IReliableDictionary<string, string> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, string>>(reliableDictName);

            try {
                using (ITransaction tx = stateManager.CreateTransaction()) {
                    if (await dict.ContainsKeyAsync(tx, clientUsername)) {
                        await dict.TryRemoveAsync(tx, clientUsername);
                        await tx.CommitAsync();
                    }
                }
            } catch (TimeoutException) {
                await Task.Delay(100);
                await DeleteState(clientUsername);
            }
        }
    }
}

