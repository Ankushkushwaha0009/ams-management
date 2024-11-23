import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private router: Router) {}
  // Method to check if the current route is part of the customer section
  isCustomerRoute(): boolean {
    const customerRoutes = [ '/search-flights', '/book-flight', '/booking-history'];
    return customerRoutes.includes(this.router.url);
  }
}

