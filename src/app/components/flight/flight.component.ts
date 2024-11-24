import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  carrierId!: number;
  carrierName!: string;
  origin!: string;
  destination!: string;
  airFare!: number;
  seatCapacityBusinessClass!: number;
  seatCapacityEconomyClass!: number;
  seatCapacityExecutiveClass!: number;
  dateOfJourney!: string;
  flights: any[] = [];
  addFlightMessage!: string;
  isFlightAdded: boolean = false;

  isEditMode: boolean = false; 
  currentFlightId!: number; 
  private apiUrl = 'http://localhost:8761/api/v1/flights'; 
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllFlights();
  }

  submitFlight() {
    const flightData = {
      carrierID: this.carrierId,
      carrierName: this.carrierName,
      origin: this.origin,
      destination: this.destination,
      airFare: this.airFare,
      seatCapacityBusinessClass: this.seatCapacityBusinessClass,
      seatCapacityEconomyClass: this.seatCapacityEconomyClass,
      seatCapacityExecutiveClass: this.seatCapacityExecutiveClass,
      dateOfJourney: this.dateOfJourney,
    };

    if (this.isEditMode) {
      this.http
        .put(`${this.apiUrl}/${this.currentFlightId}`, flightData)
        .subscribe(
          (response) => {
            this.addFlightMessage = 'Flight updated successfully!';
            this.isFlightAdded = true;
            this.isEditMode = false;
            this.clearForm();
            this.getAllFlights();
          },
          (error) => {
            this.addFlightMessage =
              'Failed to update flight. Please try again.';
            this.isFlightAdded = false;
          }
        );
    } else {
      this.http.post(this.apiUrl, flightData).subscribe(
        (response) => {
          this.addFlightMessage = 'Flight added successfully!';
          this.isFlightAdded = true;
          this.clearForm();
          this.getAllFlights();
        },
        (error) => {
          this.addFlightMessage = 'Failed to add flight. Please try again.';
          this.isFlightAdded = false;
        }
      );
    }
  }

  getAllFlights() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.flights = data;
      },
      (error) => {
        console.error('Error fetching flights:', error);
      }
    );
  }

  editFlight(flightID: number) {
    const selectedFlight = this.flights.find(
      (flight) => flight.flightID === flightID
    );
    if (selectedFlight) {
      this.carrierId = selectedFlight.carrierID;
      this.carrierName = selectedFlight.carrierName;
      this.origin = selectedFlight.origin;
      this.destination = selectedFlight.destination;
      this.airFare = selectedFlight.airFare;
      this.seatCapacityBusinessClass = selectedFlight.seatCapacityBusinessClass;
      this.seatCapacityEconomyClass = selectedFlight.seatCapacityEconomyClass;
      this.seatCapacityExecutiveClass =
        selectedFlight.seatCapacityExecutiveClass;
      this.dateOfJourney = selectedFlight.dateOfJourney;
      this.isEditMode = true;
      this.currentFlightId = flightID;
    }
  }

  deleteFlight(flightID: number) {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.http.delete(`${this.apiUrl}/${flightID}`).subscribe(
        (response) => {
          this.flights = this.flights.filter(
            (flight) => flight.flightID !== flightID
          );
          this.addFlightMessage = 'Flight deleted successfully!';
          this.isFlightAdded = true;
        },
        (error) => {
          console.error('Error deleting flight:', error);
          this.addFlightMessage = 'Failed to delete flight. Please try again.';
          this.isFlightAdded = false;
        }
      );
    }
  }

  clearForm() {
    this.carrierId = 0;
    this.carrierName = '';
    this.origin = '';
    this.destination = '';
    this.airFare = 0;
    this.seatCapacityBusinessClass = 0;
    this.seatCapacityEconomyClass = 0;
    this.seatCapacityExecutiveClass = 0;
    this.dateOfJourney = '';
    this.isEditMode = false;
    this.addFlightMessage = '';
  }
}
