import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/service/Flight.service';
import { Flight } from 'src/app/model/flight.model';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css'],
})


export class FlightSearchComponent implements OnInit {

  source: string = '';
  destination: string = '';
  date: string = '';
  flights: Flight[] = [];
  searchAttempted: boolean = false; 
  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.getAllFlights();
  }

  getAllFlights(): void {
    this.flightService.getAllFlights().subscribe(
      (data) => {
        this.flights = data;
      },
      (error) => {
        console.error('Error fetching flights:', error);
      }
    );
  }

  searchFlights(): void {
    this.searchAttempted = true; 

    if (!this.source || !this.destination || !this.date) {
      alert('Please fill in all the fields.');
      return;
    }

    this.flightService.getAllFlights().subscribe(
      (data) => {
        
        this.flights = data.filter((flight) => {
          const formattedDate = flight.dateOfJourney.substring(0, 10); // Format date to match input
          return (
            flight.origin.toLowerCase() === this.source.toLowerCase() &&
            flight.destination.toLowerCase() === this.destination.toLowerCase() &&
            formattedDate === this.date
          );
        });
        if (this.flights.length === 0) {
          console.log('No flights found for the selected criteria.');
        }
      },
      (error) => {
        console.error('Error searching flights:', error);
      }
    );
  }
}
