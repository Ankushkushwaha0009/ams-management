import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/model/Booking.model'; 
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css'],
})

export class BookingHistoryComponent implements OnInit {
  bookings: Booking[] = []; 
  constructor(private bookingService: BookingService) {}
  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe(
      (data: Booking[]) => {
        console.log('Fetched booking data:', data);
        this.bookings = data;
      },
      (error) => {
        console.error('Error fetching booking history:', error);
        alert('Error fetching booking history.');
      }
    );
  }
 
  deleteBooking(bookingId: number): void {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.bookingService.deleteBooking(bookingId).subscribe(
        (response) => {
          console.log('Booking deleted successfully', response);
          this.bookings = this.bookings.filter(
            (booking) => booking.bookingId !== bookingId
          );
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
