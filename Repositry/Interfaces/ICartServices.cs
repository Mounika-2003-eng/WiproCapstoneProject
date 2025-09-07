using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Models;

namespace ShopeForHomeAPI.Repositry.Interfaces
{
    public interface ICartServices
    {
        IEnumerable<CartItem> GetCartItems(string userId);
        void AddToCart(CartItemDto item);
        void UpdateQuantity(int itemId, int quantity);
        void RemoveItem(int itemId);
        void ClearCart(string userId);
    }
}
