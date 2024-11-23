import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { RegistrationComponent } from './components/customer-registration/customer-registration.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FlightComponent } from './components/flight/flight.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { BookFlightComponent } from './components/book-flight/book-flight.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'customer-registration', component: RegistrationComponent },
  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent }, 
  { path: 'add-flight', component: FlightComponent },
  { path: 'search-flights', component: FlightSearchComponent },
  { path: 'book-flight', component: BookFlightComponent },
  { path: 'booking-history', component: BookingHistoryComponent } ,
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard] } ,
  { path: '', redirectTo: '/search-flights', pathMatch: 'full' } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }  