import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7143/api/Cart';
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  loadCart(userId: string): void {
  this.http.get<any[]>(`${this.apiUrl}/${userId}`).subscribe(items => {
    this.cartItemsSubject.next(items);
  });
}

  isProductInCart(productId: number): boolean {
    return this.cartItemsSubject.getValue().some(item => item.productId === productId);
  }
  // 1. Get cart items for a user
  getCartItems(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
  }

  // 2. Add item to cart
  addToCart(item: any): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/add`, item);
  }

  // 3. Update item quantity
  updateQuantity(itemId: number, quantity: number): Observable<string> {
    const params = new HttpParams().set('quantity', quantity.toString());
    return this.http.put<string>(`${this.apiUrl}/update/${itemId}`, null, { params });
  }

  // 4. Remove item from cart
  removeItem(itemId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/remove/${itemId}`);
  }

  // 5. Clear cart for a user
  clearCart(userId: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/clear/${userId}`);
  }

}
