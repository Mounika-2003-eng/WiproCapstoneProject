import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDto } from '../Models/ProductDto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private ApiUrl = 'https://localhost:7143/api/Product';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.ApiUrl}/all`);
  }
  getFilteredProducts(category: string, minPrice?: number, maxPrice?: number, minRating?: number): Observable<any[]> {
    let params = new HttpParams();

    if (category) params = params.set('category', category);
    if (minPrice != null) params = params.set('minPrice', minPrice.toString());
    if (maxPrice != null) params = params.set('maxPrice', maxPrice.toString());
    if (minRating != null) params = params.set('minRating', minRating.toString());

    return this.http.get<any[]>(`${this.ApiUrl}/category-filtered`, { params });
    
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.ApiUrl}/${id}`);
  }
  addProduct(product: ProductDto): Observable<any> {
  return this.http.post(`${this.ApiUrl}/add`, product);
}

updateProduct(id: number, product: ProductDto): Observable<any> {
  return this.http.put(`${this.ApiUrl}/edit/${id}`, product);
}

deleteProduct(id: number): Observable<any> {
  return this.http.delete(`${this.ApiUrl}/delete/${id}`);
}
bulkUploadProducts(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(`${this.ApiUrl}/bulk-upload`, formData);
}
getStockInfo(): Observable<any[]> {
  return this.http.get<any[]>(`${this.ApiUrl}/stock`);
}

updateStock(productId: number, newStock: number): Observable<any> {
  const params = new HttpParams().set('newStock', newStock);
  return this.http.put(`https://localhost:7143/api/Product/stock/update/${productId}`, null, { params });
}



}
