import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ProductService } from './product-service';

@Injectable({
  providedIn: 'root'
})
export class Wishlist {
  private apiUrl = 'https://localhost:7143/api/Wishlist';
  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor(private http: HttpClient, private productService: ProductService) { }

  loadWishlist(userId: string): void {
    this.http.get<any[]>(`${this.apiUrl}/${userId}`).subscribe(wishlist => {
      const enrichedItems: any[] = [];

      wishlist.forEach(item => {
        this.productService.getProductById(item.productId).subscribe(product => {
          enrichedItems.push({ ...product, wishlistId: item.wishlistItemId });
          console.log("wishlistId:", item.wishlistItemId);

          // Once all items are fetched, update the subject
          if (enrichedItems.length === wishlist.length) {
            this.wishlistSubject.next(enrichedItems);
          }
        });
      });
    });
  }

  addToWishlist(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, item).pipe(
      tap(() => this.loadWishlist(item.userId))
    );
  }

  removeFromWishlist(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${itemId}`);
  }

  isProductWishlisted(productId: number): boolean {
    return this.wishlistSubject.getValue().some(item => item.productId === productId);
  }
}
