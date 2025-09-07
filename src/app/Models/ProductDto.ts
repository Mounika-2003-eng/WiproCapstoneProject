export class ProductDto {
    
  productId: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  stock: number;
  categoryName: string;



    constructor(productId: number, name: string, description: string, price: number, imageUrl: string, rating: number,  stock: number, categoryName: string) {
        this.productId = productId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.rating =rating;
        this.imageUrl = imageUrl;
        this.stock =stock;
        this.categoryName =categoryName;
    }
}