import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartPopupService {
  private productSubject = new BehaviorSubject<any | null>(null);
  product$ = this.productSubject.asObservable();

  setProduct(product: any): void {
    this.productSubject.next(product);
  }

  getProduct(): any {
    return this.productSubject.getValue(); // ✅ immediate access
  }

  clear(): void {
    this.productSubject.next(null);
  }
}
