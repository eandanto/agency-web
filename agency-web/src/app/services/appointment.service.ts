import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppointmentDto } from '../models/appointment';
import { environment } from '../../environment/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAppointments(
    id: string,
    page: number,
    pageSize: number
  ): Observable<{ appointments: AppointmentDto[]; totalCounts: number }> {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Set the Authorization header
    });

    return this.http
      .get<{
        appointments: any[];
        totalCounts: number;
      }>(
        `${this.apiUrl}/appointment/getmyappointments?id=${id}&pageNo=${page}&pageSize=${pageSize}`,
        { headers }
      )
      .pipe(
        map(response => ({
          appointments: response.appointments.map(a => ({
            Id: a.id,
            CustomerId: a.customerId,
            Token: a.token,
            AppointmentDate: new Date(a.appointmentDate),
            InsertedAt: new Date(a.insertedAt),
          } as AppointmentDto)),
          totalCounts: response.totalCounts,
        }))
      );
  }

  setAppointment(appointment: AppointmentDto): Observable<any> {
    const token = localStorage.getItem('token'); // Get the token from localStorage

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Set the Authorization header
    });

    return this.http.post<any>(
      `${this.apiUrl}/Appointment/SetAppointment`,
      appointment,
      { headers }
    );
  }
}
