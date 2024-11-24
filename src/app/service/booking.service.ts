import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../model/Booking.model'; // Adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8761/api/v1/bookings';

  constructor(private http: HttpClient) {}

  
  createBooking(booking: Booking): Observable<Booking[]> {
    return this.http.post<Booking[]>(`${this.apiUrl}`, booking);
  }

  getAllBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  deleteBooking(bookingId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookingId}`) ; 
  }
}
