export interface CouponDto {
  couponId: number;
  code: string;
  description: string;
  discountAmount: number;
  expiryDate: string; // ISO string from backend
}
