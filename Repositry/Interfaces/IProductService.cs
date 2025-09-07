using ShopeForHomeAPI.DTOs;
using ShopeForHomeAPI.Models;

namespace ShopeForHomeAPI.Repositry.Interfaces
{
    public interface IProductService
    {
        IEnumerable<Product> GetByCategory(string category);
        IEnumerable<Product> GetProductsWithFilters(string category, decimal? minPrice, decimal? maxPrice, double? minRating);
        IEnumerable<Product> GetAllProducts();
        //add product
        string addProduct(ProductDto product);
        //edit product
        string editProduct(int id, ProductDto product);
        //delete product
        string deleteProduct(int id);
        //get product by id
        Product getProductById(int id);

        Task<int> BulkAddProductsAsync(List<ProductDto> products);

        string UpdateStock(int productId, int newStock);

    }
}
