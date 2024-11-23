// carrier.model.ts
export interface Carrier {
    carrierID: number;
    carrierName: string;
    discountPercentageThirtyDaysAdvanceBooking: number;
    discountPercentageSixtyDaysAdvanceBooking: number;
    discountPercentageNinteyDaysAdvanceBooking: number;
    bulkBookingDiscount: number;
    refundPercentageForTicketCancellation2DaysBeforeTravelDate: number;
    refundPercentageForTicketCancellation10DaysBeforeTravelDate: number;
    refundPercentageForTicketCancellation20DaysOrMoreBeforeTravelDate: number;
    silverUserDiscount: number;
    goldUserDiscount: number;
    platinumUserDiscount: number;
}
  