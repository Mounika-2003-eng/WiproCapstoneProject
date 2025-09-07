using ShopeForHomeAPI.Models;

namespace ShopeForHomeAPI.Repositry.Interfaces
{
    public interface IAuthService
    {
        public Task<string> GenerateJwtToken(ApplicationUser user);
    }
}
