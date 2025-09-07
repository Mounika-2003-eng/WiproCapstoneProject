using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Models;

namespace ShopeForHomeAPI.Repositry.Interfaces
{
    public interface IWishlistService
    {
        IEnumerable<WishlistItem> GetWishlist(string userId);
        string AddToWishlist(WishlistItemDto item);
        string RemoveFromWishlist(int itemId);
        string ClearWishlist(string userId);
    }
}
