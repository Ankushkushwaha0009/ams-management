import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/service/booking.service'; // Import BookingService
import { Booking } from 'src/app/model/Booking.model'; // Adjust path if necessary
import { FlightService } from 'src/app/service/Flight.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css'],
})
export class BookFlightComponent implements OnInit {
  flight: any; // Holds the flight details fetched from the service
  customerName: string = '';
  seatNumber: string = '';
  selectedClass: string = 'Economy';
  noOfTravellers: number = 1;
  dateOfTravel: string = '';
  bookingAmount: number = 0;

  constructor(
    private flightService: FlightService, // Inject FlightService
    private bookingService: BookingService, // Inject BookingService
    private route: ActivatedRoute // For reading route parameters
  ) {}

  ngOnInit(): void {
    // Fetch flight details from query parameters (in this case, flightId)
    const flightId = this.route.snapshot.queryParams['flightId'];
    if (flightId) {
      this.getFlightDetails(flightId);
    } else {
      console.error('No flightId provided in the URL');
    }
  }

  // Fetch the flight details using the flightId
  getFlightDetails(flightId: number): void {
    this.flightService.getFlightById(flightId).subscribe(
      (response) => {
        this.flight = response; // Set the flight details from the response
        console.log('Fetched flight details:', this.flight);
      },
      (error) => {
        console.error('Error fetching flight details:', error);
        alert('Failed to fetch flight details. Please try again.');
      }
    );
  }

  // Calculate booking amount based on selected class and number of travelers
  calculateBookingAmount(): void {
    switch (this.selectedClass) {
      case 'Business':
        this.bookingAmount = this.noOfTravellers * this.flight.airFare * 1.5; // Adjust multiplier for Business class
        break;
      case 'Executive':
        this.bookingAmount = this.noOfTravellers * this.flight.airFare * 1.2; // Adjust multiplier for Executive class
        break;
      default:
        this.bookingAmount = this.noOfTravellers * this.flight.airFare; // Economy class by default
    }
  }

  // Book the flight
  bookFlight(): void {
    this.calculateBookingAmount(); // Calculate booking amount based on selected class and travelers

    // Create a Booking object
    const booking: Booking = {
      bookingId: 0, // Backend will generate this
      customerName: this.customerName,
      flightId: this.flight.flightID,
      seatNumber: this.seatNumber,
      seatCategory: this.selectedClass,
      dateOfTravel: this.dateOfTravel,
      bookingStatus: 'Confirmed',
      bookingAmount: this.bookingAmount,
    };

    // Call the booking service to save the booking
    this.bookingService.createBooking(booking).subscribe(
      (response) => {
        console.log('Booking successful:', response);
        alert('Flight booked successfully!');
      },
      (error) => {
        console.error('Error booking flight:', error);
        alert('Failed to book the flight. Please try again.');
      }
    );
  }
}
