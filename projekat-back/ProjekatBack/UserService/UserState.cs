using Common;
using Microsoft.ServiceFabric.Data;
using Microsoft.ServiceFabric.Data.Collections;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace UserService {
    public class UserState {
        IReliableStateManager stateManager;

        public UserState(IReliableStateManager stateManager) {
            this.stateManager = stateManager;
        }

        public async Task Create(string username, UserRole role) {
            IReliableDictionary<string, UserRole> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, UserRole>>("users");

            try {
                using (ITransaction tx = this.stateManager.CreateTransaction()) {
                    // AddAsync takes key's write lock; if >4 secs, TimeoutException
                    await dict.AddAsync(tx, username, role);

                    // After quorum responds, all locks released
                    await tx.CommitAsync();
                }
            } catch (TimeoutException) {
                // retry after delay because you couldn't get a lock on the file because it already in use. 
                await Task.Delay(100);
                await Create(username, role);
            }
        }

        public async Task<UserRole?> Read(string username) {
            IReliableDictionary<string, UserRole> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, UserRole>>("users");

            try {
                using (ITransaction tx = this.stateManager.CreateTransaction()) {
                    ConditionalValue<UserRole> result = await dict.TryGetValueAsync(tx, username);

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
            IReliableDictionary<string, UserRole> dict = await stateManager.GetOrAddAsync<IReliableDictionary<string, UserRole>>("users");

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
}
