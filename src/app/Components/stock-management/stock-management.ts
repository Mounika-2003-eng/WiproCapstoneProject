import { Component } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-management.html',
  styleUrl: './stock-management.css'
})
export class StockManagement {
  stockList: any[] = [];
  editMode: { [key: number]: boolean } = {};
  updatedStock: { [key: number]: number } = {};
  message: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadStock();
  }

  loadStock(): void {
    this.productService.getStockInfo().subscribe({
      next: data => this.stockList = data,
      error: () => this.message = 'Failed to load stock data.'
    });
  }

  enableEdit(productId: number, currentStock: number): void {
    this.editMode[productId] = true;
    this.updatedStock[productId] = currentStock;
  }

  saveStock(productId: number): void {
    const newStock = this.updatedStock[productId];
    this.productService.updateStock(productId, newStock).subscribe({
      next: res => {
        alert(res.message);
        this.editMode[productId] = false;
        this.loadStock();
      },
      error: () => alert('Failed to update stock.')
    });
  }
}
