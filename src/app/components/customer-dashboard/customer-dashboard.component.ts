import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router service

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  constructor(private router: Router) { }
  logout(): void {
    this.router.navigate(['/']);  
  }
}
