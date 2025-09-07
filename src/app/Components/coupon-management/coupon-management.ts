import { Component } from '@angular/core';
import { CouponService } from '../../Services/coupon-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CouponDto } from '../../Models/CouponDto';

@Component({
  selector: 'app-coupon-management',
  imports: [FormsModule, CommonModule],
  templateUrl: './coupon-management.html',
  styleUrl: './coupon-management.css'
})
export class CouponManagement {
  coupons: CouponDto[] = [];
  userCoupons: CouponDto[] = [];
  selectedUserId: string = '';
  selectedCouponId: number | null = null;
  message: string = '';

  constructor(private couponService: CouponService) { }

  ngOnInit(): void {
    this.loadAllCoupons();
    this.loadUserCoupons();
  }

  loadAllCoupons(): void {
    this.couponService.getAllCoupons().subscribe({
      next: data => this.coupons = data,
      error: () => this.message = 'Failed to load coupons.'
    });
  }

  loadUserCoupons(): void {
    if (!this.selectedUserId) return;
    this.couponService.getCouponsByUserId(this.selectedUserId).subscribe({
      next: data => {
        this.userCoupons = data,
          console.log(this.userCoupons);
      },
      error: () => this.message = 'Failed to load user coupons.'
    });
  }

  assignCoupon(): void {
    if (!this.selectedUserId || !this.selectedCouponId) return;
    this.couponService.assignCoupon(this.selectedUserId, this.selectedCouponId).subscribe({
      next: res => {
        alert(res.message);
        this.loadUserCoupons();
        // ✅ Clear form fields
        this.selectedUserId = '';
        this.selectedCouponId = null;

        // ✅ Manually clear input field if ngModel doesn't reflect it
        const input = document.getElementById('userId') as HTMLInputElement;
        if (input) input.value = '';
      },
      error: err => alert(err.error.message)
    });
  }

  removeCoupon(couponId: number): void {

    this.couponService.removeCoupon(this.selectedUserId, couponId).subscribe({
      next: res => {
        alert(res.message);
        this.loadUserCoupons();
      },
      error: err => alert(err.error.message)
    });
  }
}
