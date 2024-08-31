import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // Check if the user is trying to access the login or register pages
      if (state.url === '/login' || state.url === '/register') {
        const userOrCustomer = this.authService.getUserOrCustomer(); // Assuming you have this method
        if (userOrCustomer === 'CUSTOMER') {
          this.router.navigate(['/customer-dashboard']);
        } else if (userOrCustomer === 'STAFF') {
          this.router.navigate(['/staff-dashboard']);
        }
        return false; // Prevent navigating to login or register if already logged in
      }

      // Allow access to other routes if the user has a token
      return true;
    }

    // If there's no token, redirect to the login page
    if (state.url != '/login' && state.url != '/register') {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
