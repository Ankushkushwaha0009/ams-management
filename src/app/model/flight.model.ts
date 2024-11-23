// flight.model.ts
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