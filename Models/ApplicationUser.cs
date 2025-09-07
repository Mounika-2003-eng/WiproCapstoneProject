using Microsoft.AspNetCore.Identity;

namespace ShopeForHomeAPI.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }

        public ICollection<CartItem> CartItems { get; set; }
        public ICollection<WishlistItem> WishlistItems { get; set; }
        public ICollection<Order> Orders { get; set; }
        public ICollection<UserCoupon> UserCoupons { get; set; }
    }

}
