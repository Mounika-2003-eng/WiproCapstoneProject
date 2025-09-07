using Microsoft.AspNetCore.Mvc;
using ShopeForHomeAPI.Data;
using ShopeForHomeAPI.Repositry.Interfaces;

namespace ShopeForHomeAPI.Controllers
{
    [ApiController ]
    [Route("api/[controller]")]
    public class CouponController : Controller
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private ICouponService _couponService;
        public CouponController(ApplicationDbContext applicationDbContext, ICouponService couponService)
        {
            _applicationDbContext = applicationDbContext;
            _couponService = couponService;
        }
        //Endpoint -1: Get Coupons by user id
        [HttpGet("user/{userId}")]
        public IActionResult GetCouponsByUserId(string userId)
        {
            var userCoupons = _couponService.GetCouponsByUserId(userId);
            if (userCoupons == null)
            {
                return NotFound(new { message = "No coupons found for this user." });
            }
            return Ok(userCoupons);
        }
        //Endpoint -2: Get all coupons
        [HttpGet("all")]
        public IActionResult GetAllCoupons()
        {
            var coupons = _couponService.GetAllCoupons();
            if (coupons == null)
            {
                return NotFound(new { message = "No coupons available." });
            }
            return Ok(coupons);
        }
        //Endpoint -3: Assign coupon to user
        [HttpPost("assign")]
        public IActionResult AssignCouponToUser([FromQuery] string userId, [FromQuery] int couponId)
        {
            var result = _couponService.AssignCouponToUser(userId, couponId);
            if (result.Contains("Error"))
            {
                return BadRequest(new { message = result });
            }
            return Ok(new { message = result });
        }
        //Endpoint -4: Remove coupon from user
        [HttpDelete("remove")]
        public IActionResult RemoveCouponFromUser([FromQuery] string userId, [FromQuery] int couponId)
        {
            var result = _couponService.RemoveCouponFromUser(userId, couponId);
            if (result.Contains("Error"))
            {
                return BadRequest(new { message = result });
            }
            return Ok(new { message = result });
        }
    }
}
