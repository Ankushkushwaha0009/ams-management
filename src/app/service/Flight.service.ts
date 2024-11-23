import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environment';

// Flight interface for type safety
export interface Flight {
  flightID: number;
  carrierID: number;
  carrierName: string;
  origin: string;
  destination: string;
  airFare: number;
  seatCapacityBusinessClass: number;
  seatCapacityEconomyClass: number;
  seatCapacityExecutiveClass: number;
  dateOfJourney: string;
}

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = `${environment.apiUrl}/api/v1/flights`; // Dynamically set the base API URL

  constructor(private http: HttpClient) {}

  // Get all flights
  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(`${this.apiUrl}`).pipe(
      catchError((error) => {
        console.error('Error fetching flights', error);
        throw error;
      })
    );
  }

  // Get a flight by its ID
  getFlightById(flightId: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${flightId}`).pipe(
      catchError((error) => {
        console.error(`Error fetching flight with ID ${flightId}`, error);
        throw error;
      })
    );
  }

  // Add a new flight
  addFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(`${this.apiUrl}`, flight).pipe(
      catchError((error) => {
        console.error('Error adding flight', error);
        throw error;
      })
    );
  }

  // Update an existing flight
  updateFlight(flight: Flight): Observable<Flight> {
    return this.http.put<Flight>(`${this.apiUrl}/${flight.flightID}`, flight).pipe(
      catchError((error) => {
        console.error('Error updating flight', error);
        throw error;
      })
    );
  }

  // Delete a flight by its ID
  deleteFlight(flightId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${flightId}`).pipe(
      catchError((error) => {
        console.error(`Error deleting flight with ID ${flightId}`, error);
        throw error;
      })
    );
  }
}
