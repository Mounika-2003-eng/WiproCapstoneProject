using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Repositry.Interfaces;

namespace ShopeForHomeAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        // Endpoint 1: Get products by category
        [HttpGet("category/{category}")]
        public IActionResult GetByCategory(string category)
        {
            var products = _productService.GetByCategory(category);
            return Ok(products);
        }

        // Endpoint 2: Get products by category with filters
        [HttpGet("category-filtered")]
        public IActionResult GetByCategoryWithFilters(
            [FromQuery] string category,
            [FromQuery] decimal? minPrice,
            [FromQuery] decimal? maxPrice,
            [FromQuery] double? minRating)
        {
            var products = _productService.GetProductsWithFilters(category, minPrice, maxPrice, minRating);
            return Ok(products);
        }
        // Endpoint 3: Get all products
        [HttpGet("all")]
        public IActionResult GetAllProducts()
        {
            var products = _productService.GetAllProducts();
            return Ok(products);
        }

        // Endpoint 4: Add a new product
        [HttpPost("add")]
        public IActionResult AddProduct([FromBody] ProductDto product)
        {
            var result = _productService.addProduct(product);
            return Ok( new { message = result });
        }
        // Endpoint 5: Edit an existing product
        [HttpPut("edit/{id}")]
        public IActionResult EditProduct(int id, [FromBody] ProductDto product)
        {
            var result = _productService.editProduct(id, product);
            return Ok(result);
        }
        //Endpoint 6: delete product
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var result = _productService.deleteProduct(id);
            return Ok(result);
        }

        // Endpoint 7: Get product by ID
        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _productService.getProductById(id);
            if (product == null)
            {
                return NotFound("Product not found");
            }
            return Ok(product);
        }
        //bulk upload
        [HttpPost("bulk-upload")]
        public async Task<IActionResult> BulkUpload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("CSV file is missing or empty.");

            var products = new List<ProductDto>();

            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                string headerLine = await reader.ReadLineAsync(); // skip header
                while (!reader.EndOfStream)
                {
                    var line = await reader.ReadLineAsync();
                    var values = line.Split(',');

                    if (values.Length != 7)
                        continue; // skip malformed rows

                    products.Add(new ProductDto
                    {
                        Name = values[0],
                        Description = values[1],
                        Price = decimal.TryParse(values[2], out var price) ? price : 0,
                        Rating = double.TryParse(values[3], out var rating) ? rating : 0,
                        ImageUrl = values[4],
                        Stock = int.TryParse(values[5], out var stock) ? stock : 0,
                        CategoryName = values[6]
                    });
                }
            }

            var result = await _productService.BulkAddProductsAsync(products);
            return Ok(new { message = $"Uploaded {result} products successfully." });
        }
        [HttpGet("stock")]
        public IActionResult GetStockInfo()
        {
            var stockData = _productService.GetAllProducts()
                .Select(p => new {
                    p.ProductId,
                    p.Name,
                    p.Stock
                });

            return Ok(stockData);
        }
        [HttpPut("stock/update/{id}")]
        public IActionResult UpdateStock(int id, [FromQuery] int newStock)
        {
            var result = _productService.UpdateStock(id, newStock);
            return Ok(new { message = result });
        }




    }
}
