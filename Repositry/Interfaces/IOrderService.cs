using ShopeForHomeAPI.DTOs;

namespace ShopeForHomeAPI.Repositry.Interfaces
{
    public interface IOrderService
    {
        Task<int> PlaceOrderAsync(string userId, string couponCode = null);
        Task<OrderDto> GetOrderByIdAsync(int orderId);
        Task<List<OrderDto>> GetOrdersByUserAsync(string userId);


    }
}
