using ShopeForHomeAPI.Data;
using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Models;
using ShopeForHomeAPI.Repositry.Interfaces;

namespace ShopeForHomeAPI.Repositry.Implementations
{
    public class ProductService:IProductService
    {
        private readonly ApplicationDbContext _context;
        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Product> GetByCategory(string category)
        {
            return _context.Products
                .Where(p => p.Category.Name == category)
                .ToList();
        }

        public IEnumerable<Product> GetProductsWithFilters(string category, decimal? minPrice, decimal? maxPrice, double? minRating)
        {
            var query = _context.Products.Where(p => p.Category.Name == category);

            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice.Value);

            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice.Value);

            if (minRating.HasValue)
                query = query.Where(p => p.Rating >= minRating.Value);

            return query.ToList();
        }
        public IEnumerable<Product> GetAllProducts()
        {
            return _context.Products.ToList();
        }
        //add product
        public string addProduct(ProductDto product)
        {
            Product newProduct = new Product
            {
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Rating = product.Rating,
                ImageUrl = product.ImageUrl,
                Stock = product.Stock,
                CategoryId = _context.Categories.FirstOrDefault(c => c.Name == product.CategoryName)?.CategoryId ?? 0
            };
            _context.Products.Add(newProduct);
            _context.SaveChanges();
            return "Product added successfully";
        }

        //edit product
        public string editProduct(int id, ProductDto product)
        {
            var existingProduct = _context.Products.Find(id);
            if (existingProduct == null)
            {
                return "Product not found";
            }
            existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;
            existingProduct.Rating = product.Rating;
            existingProduct.ImageUrl = product.ImageUrl;
            existingProduct.Stock = product.Stock;
            existingProduct.CategoryId = _context.Categories.FirstOrDefault(c => c.Name == product.CategoryName)?.CategoryId ?? existingProduct.CategoryId;

            _context.SaveChanges();
            return "Product updated successfully";
        }

        //delete product
        public string deleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return "Product not found";
            }
            _context.Products.Remove(product);
            _context.SaveChanges();
            return "Product deleted successfully";
        }
        //get product by id
        public Product getProductById(int id)
        {

            return _context.Products.Find(id);
        }
        public async Task<int> BulkAddProductsAsync(List<ProductDto> products)
        {
            int count = 0;
            foreach (var dto in products)
            {
                var category = _context.Categories.FirstOrDefault(c => c.Name == dto.CategoryName);
                if (category == null) continue;

                var product = new Product
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Price = dto.Price,
                    Rating = dto.Rating,
                    ImageUrl = dto.ImageUrl,
                    Stock = dto.Stock,
                    CategoryId = category.CategoryId
                };

                _context.Products.Add(product);
                count++;
            }

            await _context.SaveChangesAsync();
            return count;
        }
        public string UpdateStock(int productId, int newStock)
        {
            var product = _context.Products.FirstOrDefault(p => p.ProductId == productId);
            if (product == null)
            {
                return $"Error: Product with ID {productId} not found.";
            }

            product.Stock = newStock;
            _context.SaveChanges();

            return $"Stock updated successfully for product '{product.Name}' (ID: {productId}).";
        }


    }
}
