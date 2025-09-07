import { Component } from '@angular/core';
import { OrderDto } from '../../Models/OrderDto';
import { OrderService } from '../../Services/order-service';
import { Auth } from '../../Services/auth';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, DatePipe],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css'
})
export class MyOrders {
  orders: OrderDto[] = [];
  userId: string;

  constructor(private orderService: OrderService, private auth: Auth) {
    this.userId = this.auth.getUserId();
    console.log("User ID: ", this.userId);
  }

  ngOnInit(): void {
    console.log("Fetching orders for user:", this.userId);
    

    this.orderService.getOrdersByUser(this.userId).subscribe({
      next: data => {
        this.orders = data;
        console.log("Received orders:", this.orders); // ✅ Now logs after data is set
      },
      error: err => console.error('Failed to load orders:', err)
    });
  }
  

}
