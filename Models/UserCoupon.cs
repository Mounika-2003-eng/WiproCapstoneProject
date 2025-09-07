namespace ShopeForHomeAPI.Models
{
    public class UserCoupon
    {
        public int UserCouponId { get; set; }

        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int CouponId { get; set; }
        public Coupon Coupon { get; set; }

        public DateTime AssignedDate { get; set; }
    }

}
