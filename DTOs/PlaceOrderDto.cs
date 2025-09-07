using System.Security;

namespace ShopeForHomeAPI.DTOs
{
    public class PlaceOrderDto
    {
        public string userId { get; set; }
        public string couponCode { get; set; }
    }
}
