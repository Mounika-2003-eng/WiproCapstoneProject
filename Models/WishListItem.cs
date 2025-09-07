namespace ShopeForHomeAPI.Models
{
    public class WishlistItem
    {
        public int WishlistItemId { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }
    }

}
