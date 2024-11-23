import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/model/login-request.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})

export class AdminLoginComponent {
  
  userName: string = '';
  password: string = '';
  errorMessage: string = '';
  defaultUserName: string = 'admin';
  defaultPassword: string = 'admin123';

  constructor(private router: Router) {}
  onSubmit(): void {
    const loginRequest = new LoginRequest(this.userName, this.password);
    if (
      loginRequest.userName === this.defaultUserName &&
      loginRequest.password === this.defaultPassword
    ) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}