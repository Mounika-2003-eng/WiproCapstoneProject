using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Models;

namespace ShopeForHomeAPI.Repositry.Interfaces
{
    public interface ICouponService
    {
        bool IsValidCoupon(string couponCode);
        decimal ApplyCoupon(string couponCode, decimal totalAmount);

        List<CouponDto> GetAllCoupons();

        List<CouponDto> GetCouponsByUserId (string userId);

        string AssignCouponToUser(string userId, int couponId);
        string RemoveCouponFromUser(string userId, int couponId);

    }
}
