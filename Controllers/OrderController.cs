using Microsoft.AspNetCore.Mvc;
using ShopeForHomeAPI.Data;
using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Repositry.Interfaces;

namespace ShopeForHomeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : Controller
    {

        private readonly ApplicationDbContext _applicationDbContext;
        private IOrderService _orderService;
        private ICouponService _couponService;
        public OrderController(ApplicationDbContext applicationDbContext, IOrderService orderService, ICouponService couponService)
        {
            _applicationDbContext = applicationDbContext;
            _orderService = orderService;
            _couponService = couponService;
        }
        // Endpoint 1: Place an order
        [HttpPost("placeorder")]
        public async Task<IActionResult> PlaceOrder([FromBody] PlaceOrderDto placeOrderDto)
        {
            try
            {
                var orderId = await _orderService.PlaceOrderAsync(placeOrderDto.userId, placeOrderDto.couponCode);
                return Ok(new { OrderId = orderId });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        // Endpoint 2: Get order by ID
        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetOrderById(int orderId)
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);
            if (order == null)
                return NotFound(new { message = "Order not found." });

            return Ok(order);
        }
        // Endpoint 3: Get orders by user
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetOrdersByUser(string userId)
        {
            var orders = await _orderService.GetOrdersByUserAsync(userId);
            return Ok(orders);
        }
        // Endpoint 4: Get all orders (for admin)
        [HttpGet("all")]
        public IActionResult GetAllOrders()
        {
            var orders = _applicationDbContext.Orders.ToList();
            return Ok(orders);
        }

        // Endpoint 5: get discountedprice
        [HttpGet("discountedprice/{couponCode}/{totalAmount}")]
        public IActionResult GetDiscountedPrice(string couponCode, decimal totalAmount)
        {
            if (string.IsNullOrEmpty(couponCode) ||!_couponService.IsValidCoupon(couponCode))
            {
                return BadRequest(new { message = "Invalid or expired coupon code." });
            }
            var discountedPrice = _couponService.ApplyCoupon(couponCode, totalAmount);
            return Ok(new { DiscountedPrice = discountedPrice });

        }



    }
}
