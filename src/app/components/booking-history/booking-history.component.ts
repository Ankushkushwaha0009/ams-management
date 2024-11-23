import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/model/Booking.model'; // Adjust path if needed
import { BookingService } from 'src/app/service/booking.service'; // Adjust path if needed

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  bookings: Booking[] = []; // Array to hold booking data

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    // Fetch bookings from the service
    this.bookingService.getAllBookings().subscribe(
      (data: Booking[]) => {
        console.log('Fetched booking data:', data); // Debugging
        this.bookings = data; // Directly assign data to bookings array
      },
      (error) => {
        console.error('Error fetching booking history:', error);
        alert('Error fetching booking history.');
      }
    );
  }

  // Method to delete a booking
  deleteBooking(bookingId: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(bookingId).subscribe(
        (response) => {
          console.log('Booking deleted successfully', response);
          // Remove the deleted booking from the list
          this.bookings = this.bookings.filter((booking) => booking.bookingId !== bookingId);
          alert('Booking deleted successfully');
        },
        (error) => {
          console.error('Error deleting booking:', error);
          alert('Error deleting booking.');
        }
      );
    }
  }
}
