import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../Models/ProductDto';
import { ProductService } from '../../Services/product-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-management.html',
  styleUrl: './product-management.css'
})
export class ProductManagement implements OnInit{
  products: ProductDto[] = [];
  formProduct: ProductDto = this.getEmptyProduct();
  isEditing: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }
  

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(data => this.products = data);
    
  }

  saveProduct(): void {
    if (this.isEditing) {
      console.log("Update product: ", this.formProduct);
      this.productService.updateProduct(this.formProduct.productId, this.formProduct).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    } else {
      console.log("new product: ",this.formProduct)
      this.productService.addProduct(this.formProduct).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    }
  }

  editProduct(product: ProductDto): void {
    this.formProduct = { ...product };
    this.isEditing = true;
    console.log("Editing product:", this.formProduct);
    console.log("product-Id", product.productId)
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }

  resetForm(): void {
    this.formProduct = this.getEmptyProduct();
    this.isEditing = false;
  }

  private getEmptyProduct(): ProductDto {
    return {
      productId: 0,
      name: '',
      description: '',
      price: 0,
      rating: 0,
      imageUrl: '',
      stock: 0,
      categoryName: ''
    };
  }
}
