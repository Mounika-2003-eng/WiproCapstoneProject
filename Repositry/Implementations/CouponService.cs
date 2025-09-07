using ShopeForHomeAPI.Data;
using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Models;
using ShopeForHomeAPI.Repositry.Interfaces;
using System.Linq;

namespace ShopeForHomeAPI.Repositry.Implementations
{
    public class CouponService: ICouponService
    {
       private readonly ApplicationDbContext _context;
        public CouponService(ApplicationDbContext context)
        {
            _context = context;
        }

        public  bool IsValidCoupon(string couponCode)
        {
            var coupon = _context.Coupons.FirstOrDefault(c => c.Code == couponCode && c.ExpiryDate > DateTime.UtcNow);
            return coupon != null;
        }
        public decimal ApplyCoupon(string couponCode, decimal totalAmount)
        {
            if(IsValidCoupon(couponCode))
            {
                var coupon = _context.Coupons.FirstOrDefault(c => c.Code == couponCode);
                if(coupon != null)
                {
                    return totalAmount - coupon.DiscountAmount;
                }
            }
            return totalAmount;
        }
        public List<CouponDto> GetAllCoupons()
        {
           List<CouponDto> coupons = _context.Coupons.Select(c => new CouponDto
           {
               CouponId = c.CouponId,
               Code = c.Code,
               DiscountAmount = c.DiscountAmount,
               ExpiryDate = c.ExpiryDate
           }).ToList();


          if(coupons == null || coupons.Count == 0)
            {
                return null;
            }
            return coupons;
        }
        public List<CouponDto> GetCouponsByUserId(string userId)
        {
            var userCoupons = _context.UserCoupons
                .Where(uc => uc.UserId == userId)
                .ToList();

            var couponDtos = new List<CouponDto>();

            foreach (var uc in userCoupons)
            {
                var coupon = _context.Coupons.FirstOrDefault(c => c.CouponId == uc.CouponId);
                if (coupon != null)
                {
                    couponDtos.Add(new CouponDto
                    {
                        CouponId = coupon.CouponId,
                        Code = coupon.Code,
                        DiscountAmount = coupon.DiscountAmount,
                        ExpiryDate = coupon.ExpiryDate
                    });
                }
            }

            return couponDtos;
        }

        public string AssignCouponToUser(string userId, int couponId)
        {
            var coupon = _context.Coupons.Find(couponId);
            if (coupon == null)
            {
                return "Coupon not found";
            }
            var userCoupon = new UserCoupon
            {
                UserId = userId,
                CouponId = couponId,
                AssignedDate = DateTime.UtcNow
            };
            _context.UserCoupons.Add(userCoupon);
            _context.SaveChanges();
            return "Coupon assigned to user successfully";
        }
        public string RemoveCouponFromUser(string userId, int couponId){
            var couponToRemove = _context.UserCoupons.FirstOrDefault(uc => uc.UserId == userId && uc.CouponId == couponId);
            if (couponToRemove == null)
            {
                return "Coupon not found for the user";
            }
            _context.UserCoupons.Remove(couponToRemove);
            _context.SaveChanges();
            return "Coupon removed from user successfully";
        }
    }
}
