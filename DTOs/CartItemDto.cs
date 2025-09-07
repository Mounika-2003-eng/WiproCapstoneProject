namespace ShopeForHomeAPI.DTOs
{
    public class CartItemDto
    {
        public int CartItemId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string userId { get; set; }
    }

}
