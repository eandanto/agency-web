import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserDto } from '../models/user';
import { LoginDto } from '../models/login';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.apiUrl}/User/Register`, user);
  }

  login(login: LoginDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/User/Login`, login).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          console.log(
            'Token set in localStorage:',
            localStorage.getItem('token')
          );
        }
      })
    );
  }

  getUserOrCustomer(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.UserOrCustomer;
    }
    return '';
  }

  getCustomerIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.CustomerId; // Adjust according to how your token is structured
    }
    return '';
  }
}
