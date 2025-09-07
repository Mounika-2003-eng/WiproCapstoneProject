using ShopeForHomeAPI.Data;
using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Models;
using ShopeForHomeAPI.Repositry.Interfaces;

namespace ShopeForHomeAPI.Repositry.Implementations
{
    public class CartService : ICartServices
    {
        private readonly ApplicationDbContext _context;
        public CartService(ApplicationDbContext context)
        {
            _context = context;
        }
        // Add item to cart
        public IEnumerable<CartItem> GetCartItems(string userId)
        {
            return _context.CartItems
                .Where(ci => ci.UserId == userId)
                .ToList();
        }
        // Add item to cart
        public void AddToCart(CartItemDto item)
        {
            var existingItem = _context.CartItems
                .FirstOrDefault(ci => ci.UserId == item.userId && ci.ProductId == item.ProductId);

            if (existingItem != null)
            {
                existingItem.Quantity += item.Quantity;
            }
            else
            {
                var cartItem = new CartItem
                {
                    UserId = item.userId,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity
                };
                _context.CartItems.Add(cartItem);
            }
            _context.SaveChanges();
        }

        // Update item quantity
        public void UpdateQuantity(int itemId, int quantity)
        {
            var cartItem = _context.CartItems.Find(itemId);
            if (cartItem != null)
            {
                cartItem.Quantity = quantity;
                _context.SaveChanges();
            }
        }
        // Remove item from cart
        public void RemoveItem(int itemId)
        {
            var cartItem = _context.CartItems.Find(itemId);
            if (cartItem != null)
            {
                _context.CartItems.Remove(cartItem);
                _context.SaveChanges();
            }
        }
        // Clear cart
        public void ClearCart(string userId)
        {
            var cartItems = _context.CartItems.Where(ci => ci.UserId == userId);
            _context.CartItems.RemoveRange(cartItems);
            _context.SaveChanges();
        }


    }
}
