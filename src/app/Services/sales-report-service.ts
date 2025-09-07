import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SalesReportDto } from '../Models/SalesReportDto';

@Injectable({
  providedIn: 'root'
})
export class SalesReportService {
  private apiUrl = 'https://localhost:7143/api/SalesReport/sales-report';


  constructor(private http: HttpClient) {}

  getSalesReport(fromDate: string, toDate: string): Observable<SalesReportDto> {
    const params = new HttpParams()
      .set('fromDate', fromDate)
      .set('toDate', toDate);

    return this.http.get<SalesReportDto>(this.apiUrl, { params });
  }
}
