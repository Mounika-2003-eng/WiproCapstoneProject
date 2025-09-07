import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { LoginDto } from '../Models/LoginDto';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'https://localhost:7143/api/Auth';

  constructor(private http: HttpClient) { }

  login(data: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: { fullName: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
      return decoded[roleClaim] ?? null;
    } catch (err) {
      console.error('Token decode failed:', err);
      return null;
    }
  }

  getUserId(): string {
    const token = this.getToken();
    if (!token || typeof token !== 'string') return '';

    try {
      const decoded = jwtDecode<{ [key: string]: any }>(token);
      const userIdClaim = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
      const userId = decoded[userIdClaim];

      return typeof userId === 'string' ? userId : '';
    } catch (error) {
      console.error('Token decode failed:', error);
      return '';
    }
  }

}
