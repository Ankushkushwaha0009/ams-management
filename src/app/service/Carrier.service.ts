import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrierService {
  private apiUrl = 'http://localhost:8761/api/v1/carrier'; // Make sure this matches your backend URL

  constructor(private http: HttpClient) { }

  // Add Carrier
  addCarrier(carrier: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, carrier);  // Ensure this endpoint exists in your backend
  }

  // Update Carrier
  updateCarrier(id: number, carrier: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, carrier);  // Make sure this endpoint exists in your backend
  }

  // Delete Carrier
  deleteCarrier(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);  // Ensure this endpoint exists in your backend
  }

  // Get Carrier by ID
  getCarrierById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);  // Ensure this endpoint exists in your backend
  }
}
