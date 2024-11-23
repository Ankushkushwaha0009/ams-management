import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
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

  isEditMode: boolean = false; // New flag to check edit mode
  currentFlightId!: number;   // Store the ID of the flight being edited

  private apiUrl = 'http://localhost:8761/api/v1/flights'; // Update with your backend API URL

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
      dateOfJourney: this.dateOfJourney
    };

    if (this.isEditMode) {
      // Update flight if in edit mode
      this.http.put(`${this.apiUrl}/${this.currentFlightId}`, flightData).subscribe(
        response => {
          this.addFlightMessage = 'Flight updated successfully!';
          this.isFlightAdded = true;
          this.isEditMode = false; // Reset edit mode
          this.clearForm(); // Clear the form
          this.getAllFlights(); // Refresh flight list
        },
        error => {
          this.addFlightMessage = 'Failed to update flight. Please try again.';
          this.isFlightAdded = false;
        }
      );
    } else {
      // Add new flight
      this.http.post(this.apiUrl, flightData).subscribe(
        response => {
          this.addFlightMessage = 'Flight added successfully!';
          this.isFlightAdded = true;
          this.clearForm(); // Clear the form
          this.getAllFlights(); // Refresh flight list
        },
        error => {
          this.addFlightMessage = 'Failed to add flight. Please try again.';
          this.isFlightAdded = false;
        }
      );
    }
  }

  getAllFlights() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      data => {
        this.flights = data;
      },
      error => {
        console.error('Error fetching flights:', error);
      }
    );
  }

  editFlight(flightID: number) {
    // Find the selected flight
    const selectedFlight = this.flights.find(flight => flight.flightID === flightID);
    if (selectedFlight) {
      // Populate the form fields with the flight data
      this.carrierId = selectedFlight.carrierID;
      this.carrierName = selectedFlight.carrierName;
      this.origin = selectedFlight.origin;
      this.destination = selectedFlight.destination;
      this.airFare = selectedFlight.airFare;
      this.seatCapacityBusinessClass = selectedFlight.seatCapacityBusinessClass;
      this.seatCapacityEconomyClass = selectedFlight.seatCapacityEconomyClass;
      this.seatCapacityExecutiveClass = selectedFlight.seatCapacityExecutiveClass;
      this.dateOfJourney = selectedFlight.dateOfJourney;
      this.isEditMode = true; // Enable edit mode
      this.currentFlightId = flightID; // Set the current flight ID
    }
  }

  deleteFlight(flightID: number) {
    if (confirm('Are you sure you want to delete this flight?')) {
      this.http.delete(`${this.apiUrl}/${flightID}`).subscribe(
        response => {
          // Remove the deleted flight from the local flights array
          this.flights = this.flights.filter(flight => flight.flightID !== flightID);
          this.addFlightMessage = 'Flight deleted successfully!';
          this.isFlightAdded = true; // Set the success flag for UI purposes
        },
        error => {
          console.error('Error deleting flight:', error);
          this.addFlightMessage = 'Failed to delete flight. Please try again.';
          this.isFlightAdded = false; // Set the error flag for UI purposes
        }
      );
    }
  }

  clearForm() {
    // Reset all form fields
    this.carrierId = 0;
    this.carrierName = '';
    this.origin = '';
    this.destination = '';
    this.airFare = 0;
    this.seatCapacityBusinessClass = 0;
    this.seatCapacityEconomyClass = 0;
    this.seatCapacityExecutiveClass = 0;
    this.dateOfJourney = '';
    this.isEditMode = false; // Reset edit mode
    this.addFlightMessage = ''; // Clear message
  }
}
