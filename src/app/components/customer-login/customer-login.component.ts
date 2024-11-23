import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { LoginRequest } from 'src/app/model/login-request.model';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css'],
})

export class CustomerLoginComponent {

  userName: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(): void {
    const loginRequest = new LoginRequest(this.userName, this.password);
    this.loginService.login(loginRequest).subscribe(
      (response) => {
        // On successful login, redirect to the customer dashboard
        this.router.navigate(['/customer-dashboard']);
      },
      (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid username or password';
      }
    );
  }

  // Method to navigate to the registration page
  goToRegisterPage(): void {
    this.router.navigate(['/customer-registration']);
  }

}
