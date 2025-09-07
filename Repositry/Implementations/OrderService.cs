using ShopeForHomeAPI.Data;
using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Models;
using ShopeForHomeAPI.Repositry.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ShopeForHomeAPI.Repositry.Implementations
{
    public class OrderService:IOrderService
    {
        private readonly ApplicationDbContext _context;
        private readonly ICouponService _couponService;

        public OrderService(ApplicationDbContext context, ICouponService couponService)
        {
            _context = context;
            _couponService = couponService;
        }
        public async Task<int> PlaceOrderAsync(string userId, string couponCode = null)
        {
            // 1. Fetch cart items with product details
            var cartItems = await _context.CartItems
                .Where(c => c.UserId == userId)
                .Include(c => c.Product)
                .ToListAsync();

            if (cartItems == null || !cartItems.Any())
                throw new ArgumentException("Cart is empty. Cannot place order.");

            // 2. Calculate total amount
            decimal totalAmount = cartItems.Sum(c => c.Product.Price * c.Quantity);

            // 3. Apply coupon if valid
            Coupon appliedCoupon = null;
            if (!string.IsNullOrEmpty(couponCode))
            {
                if (_couponService.IsValidCoupon(couponCode))
                {
                    appliedCoupon = await _context.Coupons.FirstOrDefaultAsync(c => c.Code == couponCode);
                    totalAmount = _couponService.ApplyCoupon(couponCode, totalAmount);
                }
                else
                {
                    throw new InvalidOperationException("Invalid or expired coupon.");
                }
            }

            // 4. Check and reduce stock
            foreach (var item in cartItems)
            {
                var product = item.Product;
                if (product.Stock < item.Quantity)
                    throw new InvalidOperationException($"Insufficient stock for product '{product.Name}'.");

                product.Stock -= item.Quantity;
            }

            // 5. Create order and order items
            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.UtcNow,
                TotalAmount = totalAmount,
                CouponId = appliedCoupon?.CouponId,
                OrderItems = cartItems.Select(c => new OrderItem
                {
                    ProductId = c.ProductId,
                    Quantity = c.Quantity,
                    Price = c.Product.Price
                }).ToList()
            };

            _context.Orders.Add(order);

            // 6. Clear cart
            _context.CartItems.RemoveRange(cartItems);

            // 7. Save changes
            await _context.SaveChangesAsync();

            return order.OrderId;
        }


        public async Task<OrderDto> GetOrderByIdAsync(int orderId)
        {
            var order = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
                return null;

            return new OrderDto
            {
                OrderId = order.OrderId,
                UserId = order.UserId,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    ProductName = oi.Product.Name,
                    Price = oi.Product.Price
                }).ToList()
            };
        }

        public async Task<List<OrderDto>> GetOrdersByUserAsync(string userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToListAsync();

            return orders.Select(order => new OrderDto
            {
                OrderId = order.OrderId,
                UserId = order.UserId,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                Items = order.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    ProductName = oi.Product.Name,
                    Price = oi.Product.Price
                }).ToList()
            }).ToList();
        }


    }
}
