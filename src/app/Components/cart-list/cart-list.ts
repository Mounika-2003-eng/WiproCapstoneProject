import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from '../../Services/cart-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../Services/auth';
import { ProductService } from '../../Services/product-service';
import { OrderService } from '../../Services/order-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-list',
  imports: [ CommonModule, FormsModule],
  templateUrl: './cart-list.html',
  styleUrl: './cart-list.css'
})

export class CartList {

  cartItems: CartItemDto[] = [];
  userId: string;
  couponCode: string = '';
  discountedTotal: number | null = null;
  discountMessage: string = '';

  constructor(private cartService: CartService, private orderService: OrderService, private authService: Auth, private productService: ProductService, private cdr: ChangeDetectorRef) {
    this.userId = this.authService.getUserId();
    console.log("User ID: ", this.userId);
  }

  ngAfterViewInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCartItems(this.userId).subscribe(cartItems => {
      const enrichedItems: any[] = [];

      cartItems.forEach(item => {
        this.productService.getProductById(item.productId).subscribe(product => {
          console.log("Product Details: ", product);
          console.log("Cart Item: ", item);
          enrichedItems.push({
            ...item,
            id: item.cartItemId,
            productName: product.name,
            price: product.price,
            imageUrl: product.imageUrl
          });

          // Once all items are enriched, update the UI
          if (enrichedItems.length === cartItems.length) {
            this.cartItems = [...enrichedItems];
            this.cdr.detectChanges();
            console.log("Cart Items: ", this.cartItems);
          }
        });
      });
    });
  }
  updateQuantity(itemId: number, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity).subscribe(() => {
      this.loadCart();
    });
  }

  removeItem(itemId: number): void {
    console.log("Removing item from cart:", itemId);
    this.cartService.removeItem(itemId).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
      console.log("Updated Cart Items: ", this.cartItems);
      this.cdr.detectChanges();
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  clearCart(): void {
    this.cartService.clearCart(this.userId).subscribe(() => {
      this.cartItems = [];
    });
  }
  placeOrder(): void {

    this.orderService.placeOrder(this.userId, this.couponCode).subscribe({
      next: response => {
        alert(`Order placed successfully! Order ID: ${response.orderId}`);
        this.clearCart(); // optional
        this.couponCode = ''; // reset coupon code
      },
      error: err => {
        console.error('Order placement failed:', err);
        alert('Failed to place order. Please try again.');
      }
    });
  }
  fetchDiscountedPrice(): void {
  const total = this.getTotal();

  if (!this.couponCode || total <= 0) {
    this.discountMessage = 'Please enter a valid coupon and ensure your cart has items.';
    return;
  }

  this.orderService.getDiscountedPrice(this.couponCode, total).subscribe({
    next: res => {
      this.discountedTotal = res.discountedPrice;
      this.discountMessage = `Coupon applied! New total: ₹${res.discountedPrice}`;
    },
    error: err => {
      console.error('Failed to fetch discounted price:', err);
      this.discountMessage = 'Invalid or expired coupon code.';
      this.discountedTotal = null;
    }
  });
}


}
