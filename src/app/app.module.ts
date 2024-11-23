import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/customer-registration/customer-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';
import { LoginService } from './service/login.service';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlightComponent } from './components/flight/flight.component';
import { FlightSearchComponent } from './components/flight-search/flight-search.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { BookFlightComponent } from './components/book-flight/book-flight.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LandingPageComponent,
    CustomerLoginComponent,
    AdminLoginComponent,
    CustomerDashboardComponent,
    AdminDashboardComponent,
    FlightComponent,
    FlightSearchComponent,
    BookingHistoryComponent,
    BookFlightComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
