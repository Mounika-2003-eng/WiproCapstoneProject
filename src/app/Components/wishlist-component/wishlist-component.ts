import { Component } from '@angular/core';
import { Wishlist } from '../../Services/wishlist';
import { Auth } from '../../Services/auth';
import { CartService } from '../../Services/cart-service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product-service';

@Component({
  selector: 'app-wishlist-component',
  imports: [CommonModule],
  templateUrl: './wishlist-component.html',
  styleUrl: './wishlist-component.css'
})
export class WishlistComponent {
  wishlistItems: any[] = [];

  constructor(
    private wishlistService: Wishlist,
    private auth: Auth,
    private cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const userId = this.auth.getUserId();
    this.wishlistService.loadWishlist(userId); // triggers enrichment
    this.wishlistService.wishlist$.subscribe(items => {
      this.wishlistItems = items;
      console.log("Wishlist Items: ", this.wishlistItems);
    });
  }
  
  removeFromWishlist(itemId: number): void {
    this.wishlistService.removeFromWishlist(itemId).subscribe(() => {
      const userId = this.auth.getUserId();
      console.log("Removing item from wishlist, refreshing...", itemId);
      this.wishlistService.loadWishlist(userId); // refresh after removal

    });
  }

  addToCart(product: any): void {
    const cartItem = {
      productId: product.productId,
      quantity: 1,
      userId: this.auth.getUserId()
    };

    this.cartService.addToCart(cartItem).subscribe(() => {
      alert(`${product.name} added to cart!`);
    });
  }
}
