import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  action: string = 'login';
  private apiUrl = 'http://api.devindex.com';
  // private apiUrl = 'https://api.kalengkangart.my.id';
  private isLoggedIn = false;

  constructor(private http: HttpClient) {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password, action: this.action }).pipe(
      tap(response => {
        if (response.status === 'successLogin') {
          localStorage.setItem('token', response.token);
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      }),
      catchError(() => {
        return of({ status: 'internalServerError' });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      return Date.now() < exp * 1000;
    } catch (e) {
      return false;
    }
  }
}