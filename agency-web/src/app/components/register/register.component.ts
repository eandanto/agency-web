import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDto } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userType = 'customer';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  passwordMismatch = false; // Add this property for password validation

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Check if passwords match
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    const userDto: UserDto = {
      FirstName: this.firstName,
      LastName: this.lastName,
      EmailAddress: this.email,
      Password: this.password,
      UserOrCustomer: this.userType
    };

    this.authService.register(userDto).subscribe(response => {
      if (response) {
        this.router.navigate(['/login']);
      }
    }, error => {
      alert('Registration failed');
    });
  }
}
