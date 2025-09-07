import { Component } from '@angular/core';
import { CouponService } from '../../Services/coupon-service';
import { Auth } from '../../Services/auth';
import { CommonModule, DatePipe } from '@angular/common';
import { CouponDto } from '../../Models/CouponDto';

@Component({
  selector: 'app-my-coupons',
  imports: [CommonModule, DatePipe],
  templateUrl: './my-coupons.html',
  styleUrl: './my-coupons.css'
})
export class MyCoupons {
  coupons: CouponDto[] = [];
  userId: string;

  constructor(private couponService: CouponService, private auth: Auth) {
    this.userId = this.auth.getUserId();
  }

  ngOnInit(): void {
    this.couponService.getCouponsByUserId(this.userId).subscribe({
      next: data => {
        this.coupons = data;
        console.log("Fetched coupons for user:", this.userId);
        console.log("Coupons: ", this.coupons);
      },
      error: err => console.error('Failed to load coupons:', err)
    });
  }
}
