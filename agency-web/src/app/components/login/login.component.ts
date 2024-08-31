import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDto } from '../../models/login';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userType = 'customer';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    const loginDto: LoginDto = {
      EmailAddress: this.email,
      Password: this.password,
      UserOrCustomer: this.userType,
    };

    this.authService.login(loginDto).subscribe(
      (response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          if (this.userType === 'customer') {
            this.router.navigate(['/customer-dashboard']);
          } else {
            this.router.navigate(['/staff-dashboard']);
          }
        } else {
          this.toastr.error(
            'Login failed. Please check your credentials.',
            'Error'
          );
        }
      },
      (error) => {
        this.toastr.error(
          'Login failed. Please check your credentials.',
          'Error'
        );
      }
    );
  }
}
