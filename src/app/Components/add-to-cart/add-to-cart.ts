import { Component, Input } from '@angular/core';
import { CartService } from '../../Services/cart-service';
import { Auth } from '../../Services/auth';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartPopupService } from '../../Shared/cart-popup-service';

@Component({
  selector: 'app-add-to-cart',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css'
})
export class AddToCart {
  @Input() product: any;
  quantity: number = 1;
  added = false;

  constructor(private cartService: CartService, private auth: Auth, private cartPopupService: CartPopupService) {}
  ngOnInit(): void {
    console.log('Product received in AddToCartComponent:', this.product);
  }
  addToCart(): void {
    const cartItem = {
      productId: this.product.productId,
      quantity: this.quantity,
      userId: this.auth.getUserId(),
    };

    this.cartService.addToCart(cartItem).subscribe(() => {
      this.added = true;
      alert(`${this.product.name} added to cart!`);
      this.cartPopupService.clear();
    });
  }
  close(): void {
  this.cartPopupService.clear();
}
}
