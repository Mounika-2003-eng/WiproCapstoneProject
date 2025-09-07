namespace ShopeForHomeAPI.DTOs
{
    public class CouponDto
    {
        public int CouponId { get; set; }
        public string Code { get; set; }
        public decimal DiscountAmount { get; set; }
        public DateTime ExpiryDate { get; set; }
    }

}
