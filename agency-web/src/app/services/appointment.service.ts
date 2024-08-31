import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentDto } from '../models/appointment';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  setAppointment(appointment: AppointmentDto): Observable<AppointmentDto> {
    return this.http.post<AppointmentDto>(`${this.apiUrl}/Appointment/SetAppointment`, appointment);
  }

  getAppointmentsByDate(date: string): Observable<AppointmentDto[]> {
    return this.http.get<AppointmentDto[]>(`${this.apiUrl}/Appointment/GetAppointmentsByDate?date=${date}`);
  }
}
