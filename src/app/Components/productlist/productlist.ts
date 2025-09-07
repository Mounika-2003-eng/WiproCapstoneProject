import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { CommonModule } from '@angular/common';
import { DisplayProduct } from '../display-product/display-product';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AddToCart } from '../add-to-cart/add-to-cart';
import { CartPopupService } from '../../Shared/cart-popup-service';

@Component({
  selector: 'app-productlist',
  imports: [CommonModule, DisplayProduct, ReactiveFormsModule, AddToCart],
  templateUrl: './productlist.html',
  styleUrl: './productlist.css'
})
export class Productlist implements OnInit {
  selectedProduct: any = null;
  products$ = new BehaviorSubject<any[]>([]);
  categories: string[] = ['','Furniture', 'Decors', 'Electronics', 'Fashion', 'Home', 'Books', 'Toys'];

  filterForm;
  constructor(private productService: ProductService, private fb: FormBuilder, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private cartPopupService: CartPopupService) {
    this.filterForm = this.fb.group({
      category: [''],
      minPrice: [null],
      maxPrice: [null],
      minRating: [null]
    });

  }

  ngOnInit(): void {
    this.loadProducts();
    this.selectedProduct = this.cartPopupService.getProduct(); // immediate access
    this.cartPopupService.product$.subscribe(product => {
      this.selectedProduct = product;
      this.cdr.detectChanges();
      console.log('Selected product for popup:', product);
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(res => {
      this.products$.next([...res]);
      console.log("All Products: ", this.products$);
    });
  }

  applyFilters(): void {
    const { category, minPrice, maxPrice, minRating } = this.filterForm.value;
    const safeCategory: string = category ?? '';
    const safeMinPrice = minPrice ?? undefined;
    const safeMaxPrice = maxPrice ?? undefined;
    const safeMinRating = minRating ?? undefined;
    this.productService.getFilteredProducts(safeCategory, safeMinPrice, safeMaxPrice, safeMinRating).subscribe(res => {
      this.products$.next([...res]);
      this.cdr.detectChanges();
      console.log("Filtered Products: ", this.products$);
    });
  }
}
