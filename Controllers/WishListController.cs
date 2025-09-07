using Microsoft.AspNetCore.Mvc;
using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Repositry.Implementations;
using ShopeForHomeAPI.Repositry.Interfaces;

namespace ShopeForHomeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WishListController : Controller
    {
        private readonly IWishlistService _wishListService;
        public WishListController(IWishlistService wishListService)
        {
            _wishListService = wishListService;
        }
        // Endpoint 1: Get wishlist items for a user
        [HttpGet("{userId}")]
        public IActionResult GetWishlistItems(string userId)
        {
            var items = _wishListService.GetWishlist(userId);
            return Ok(items);
        }

        // Endpoint 2: Add item to wishlist
        [HttpPost("add")]
        public IActionResult AddToWishlist([FromBody] WishlistItemDto item)
        {
            var result = _wishListService.AddToWishlist(item);
            return Ok(new { message = result } );
        }

        // Endpoint 3: Remove item from wishlist
        [HttpDelete("remove/{itemId}")]
        public IActionResult RemoveItem(int itemId)
        {
            var result = _wishListService.RemoveFromWishlist(itemId);
            return Ok(new { message = result });
        }
        // Endpoint 4: Clear wishlist for a user
        [HttpDelete("clear/{userId}")]
        public IActionResult ClearWishlist(string userId)
        {
            var result = _wishListService.ClearWishlist(userId);
            return Ok(new { message = result });
        }

    }
}
