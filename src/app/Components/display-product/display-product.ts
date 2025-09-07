import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartPopupService } from '../../Shared/cart-popup-service';
import { CartService } from '../../Services/cart-service';
import { Auth } from '../../Services/auth';
import { Wishlist } from '../../Services/wishlist';

@Component({
  selector: 'app-display-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './display-product.html',
  styleUrl: './display-product.css'
})
export class DisplayProduct {
  @Input() product: any;
  isWishlisted = false;
  isInCart = false;


  constructor(private cartPopupService: CartPopupService,private wishlistService: Wishlist, private cartService: CartService, private authService: Auth, private router: Router) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    this.cartService.loadCart(userId); // ensure cart is loaded
    this.cartService.cartItems$.subscribe(items => {
      this.isInCart = items.some(item => item.productId === this.product.productId);
      console.log(`Product ${this.product.productId} in cart:`, this.isInCart);
    });

    this.wishlistService.loadWishlist(userId);
    this.wishlistService.wishlist$.subscribe(items => {
      this.isWishlisted = items.some(item => item.productId === this.product.productId);
    });

  }
  toggleWishlist() {
    this.isWishlisted = true;
    console.log(`${this.product.name} added to wishlist`);
    // Optionally call wishlist service here
  }

  openAddToCart(): void {
    console.log('Product in DisplayProduct:', this.product);
    this.cartPopupService.setProduct(this.product);
    console.log('Navigating with product ID:', this.product.id);
  }

  addToWishlist(): void {
  const item = {
    productId: this.product.productId,
    userId: this.authService.getUserId()
  };

  this.wishlistService.addToWishlist(item).subscribe(() => {
    alert(`${this.product.name} added to wishlist!`);
  });
}
}
