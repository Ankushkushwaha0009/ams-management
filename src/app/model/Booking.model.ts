export interface Booking {
    bookingId: number;       // Matches "bookingId" in the response
    customerName: string;    // Matches "customerName"
    flightId: number;        // Matches "flightId"
    seatNumber: string;      // Matches "seatNumber"
    seatCategory: string;    // Matches "seatCategory"
    dateOfTravel: string;    // Matches "dateOfTravel"
    bookingStatus: string;   // Matches "bookingStatus"
    bookingAmount: number;   // Matches "bookingAmount"
}

