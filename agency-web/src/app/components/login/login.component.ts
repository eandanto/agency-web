import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userType = 'customer';
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const loginDto: LoginDto = {
      EmailAddress: this.email,
      Password: this.password,
      UserOrCustomer: this.userType
    };

    this.authService.login(loginDto).subscribe(response => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        if (this.userType === 'customer') {
          this.router.navigate(['/customer-dashboard']);
        } else {
          this.router.navigate(['/staff-dashboard']);
        }
      }
    }, error => {
      alert('Login failed');
    });
  }
}
