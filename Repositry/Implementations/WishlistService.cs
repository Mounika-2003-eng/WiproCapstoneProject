using ShopeForHomeAPI.Data;
using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Models;
using ShopeForHomeAPI.Repositry.Interfaces;

namespace ShopeForHomeAPI.Repositry.Implementations
{
    public class WishlistService : IWishlistService
    {
        private readonly ApplicationDbContext _context;

        public WishlistService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<WishlistItem> GetWishlist(string userId)
        {
            return _context.WishlistItems.Where(w => w.UserId == userId).ToList();
        }

        public string AddToWishlist(WishlistItemDto item)
        {

            var existingItem = _context.WishlistItems
                .FirstOrDefault(w => w.UserId == item.UserId && w.ProductId == item.ProductId);

            if (existingItem != null)
            {
                return "Item already in wishlist.";
            }

            WishlistItem newItem = new WishlistItem
            {
                UserId = item.UserId,
                ProductId = item.ProductId
            };
            _context.WishlistItems.Add(newItem);
            _context.SaveChanges();
            return "Item added to wishlist.";
        }

        public string RemoveFromWishlist(int itemId)
        {
            var item = _context.WishlistItems.Find(itemId);
            if (item == null)
            {
                return "Item not found in wishlist.";
            }

            _context.WishlistItems.Remove(item);
            _context.SaveChanges();
            return "Item removed from wishlist.";
        }

        public string ClearWishlist(string userId)
        {
            var items = _context.WishlistItems.Where(w => w.UserId == userId).ToList();
            if (!items.Any())
            {
                return "Wishlist is already empty.";
            }

            _context.WishlistItems.RemoveRange(items);
            _context.SaveChanges();
            return "Wishlist cleared.";
        }
    }
}
