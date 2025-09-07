import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CouponDto } from '../Models/CouponDto';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
   private apiUrl = 'https://localhost:7143/api/Coupon';

  constructor(private http: HttpClient) {}

  getAllCoupons(): Observable<CouponDto[]> {
    return this.http.get<CouponDto[]>(`${this.apiUrl}/all`);
  }

  getCouponsByUserId(userId: string): Observable<CouponDto[]> {
    return this.http.get<CouponDto  []>(`${this.apiUrl}/user/${userId}`);
  }
  assignCoupon(userId: string, couponId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId).set('couponId', couponId);
    return this.http.post(`${this.apiUrl}/assign`, null, { params });
  }

  removeCoupon(userId: string, couponId: number): Observable<any> {
    const params = new HttpParams().set('userId', userId).set('couponId', couponId);
    return this.http.delete(`${this.apiUrl}/remove`, { params });
  }
}
