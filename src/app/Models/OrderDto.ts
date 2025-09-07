export interface OrderDto {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  couponCode?: string;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

