using Microsoft.ServiceFabric.Data;
using Microsoft.ServiceFabric.Data.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RideService.State {
    public class OrderedRideStateManager {
        IReliableStateManager stateManager;
        string reliableDictName = "orderedrides";

        public OrderedRideStateManager(IReliableStateManager stateManager) {
            this.stateManager = stateManager;
        }

        public async Task CreateState(string clientUsername, OrderedRide orderedRide) {
            IReliableDictionary<string, OrderedRide> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, OrderedRide>>(reliableDictName);

            try {
                using (ITransaction tx = stateManager.CreateTransaction()) {
                    // AddAsync takes key's write lock; if >4 secs, TimeoutException
                    await dict.AddAsync(tx, clientUsername, orderedRide);

                    // After quorum responds, all locks released
                    await tx.CommitAsync();
                }
            } catch (TimeoutException) {
                // retry after delay because you couldn't get a lock on the file because it already in use. 
                await Task.Delay(100);
                await CreateState(clientUsername, orderedRide);
            }
        }

        public async Task<OrderedRide> ReadState(string clientUsername) {
            IReliableDictionary<string, OrderedRide> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, OrderedRide>>(reliableDictName);

            try {
                using (ITransaction tx = stateManager.CreateTransaction()) {
                    ConditionalValue<OrderedRide> result = await dict.TryGetValueAsync(tx, clientUsername);

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
            IReliableDictionary<string, OrderedRide> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, OrderedRide>>(reliableDictName);

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
