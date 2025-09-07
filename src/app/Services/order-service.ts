import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7143/api/Order';
  constructor(private http: HttpClient) { }

  placeOrder(userId: string, couponCode?: string): Observable<{ orderId: number }> {
    const payload = {
      userId,
      couponCode: couponCode || ''
    };

    return this.http.post<{ orderId: number }>(`${this.apiUrl}/placeorder`, payload);
  }

  getOrdersByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}`);
  }
  getDiscountedPrice(couponCode: string, totalAmount: number): Observable<{ discountedPrice: number }> {
    const url = `${this.apiUrl}/discountedprice/${couponCode}/${totalAmount}`;
    return this.http.get<{ discountedPrice: number }>(url);
  }

}
