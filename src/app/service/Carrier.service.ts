import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrierService {
  private apiUrl = 'http://localhost:8761/api/v1/carrier';

  constructor(private http: HttpClient) {}

  addCarrier(carrier: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, carrier);
  }

  updateCarrier(id: number, carrier: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, carrier);
  }

  deleteCarrier(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getCarrierById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
