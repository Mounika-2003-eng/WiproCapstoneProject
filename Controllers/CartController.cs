using Microsoft.AspNetCore.Mvc;
using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Repositry.Interfaces;

namespace ShopeForHomeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : Controller
    {
        private readonly ICartServices _cartService;
        public CartController(ICartServices cartService)
        {
            _cartService = cartService;
        }

        //Endpoint 1: Get cart items for a user
        [HttpGet("{userId}")]
        public IActionResult GetCartItems(string userId)
        {
            var items = _cartService.GetCartItems(userId);
            return Ok(items);
        }

        // Endpoint 2: Add item to cart
        [HttpPost("add")]
        public IActionResult AddToCart([FromBody] CartItemDto item)
        {
            _cartService.AddToCart(item);
            return Ok(new { message = "Successfully added to cart" });
        }

        // Endpoint 3: Update item quantity
        [HttpPut("update/{itemId}")]
        public IActionResult UpdateQuantity(int itemId, [FromQuery] int quantity)
        {
            _cartService.UpdateQuantity(itemId, quantity);
            return Ok(new { message = "Updated Quantity" });
        }
        // Endpoint 4: Remove item from cart
        [HttpDelete("remove/{itemId}")]
        public IActionResult RemoveItem(int itemId)
        {
            _cartService.RemoveItem(itemId);
            return Ok(new { message = "Removed from cart" });
        }
        // Endpoint 5: Clear cart for a user
        [HttpDelete("clear/{userId}")]
        public IActionResult ClearCart(string userId)
        {
            _cartService.ClearCart(userId);
            return Ok(new { message = "Cleared the cart" });

        }
    }
}
