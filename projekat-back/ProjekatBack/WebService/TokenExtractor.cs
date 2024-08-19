using Common.Model;
using System.Linq;
using System.Security.Claims;
using WebUserCommon.Model;

namespace WebService {
    public class TokenExtractor {
        public string GetUsernameFromToken(ClaimsPrincipal userClaimsPrincipal) {
            return userClaimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
        }

        public UserRole GetRoleFromToken(ClaimsPrincipal userClaimsPrincipal) {
            string role = userClaimsPrincipal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;
            if (role == "Client") {
                return UserRole.Client;
            } else if (role == "Driver") {
                return UserRole.Driver;
            } else {
                return UserRole.Admin;
            }
        }
    }
}
