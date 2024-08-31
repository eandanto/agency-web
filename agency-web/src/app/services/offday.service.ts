import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OffDayDto } from '../models/offday';
import { environment } from '../../environment/environment';
import { format } from 'date-fns';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OffDayService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDayOffs(): Observable<OffDayDto[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<OffDayDto[]>(`${this.apiUrl}/OffDay/GetOffDays`, {
      headers,
    }).pipe(
      map(offDays => offDays.map(offDay => this.mapToPascalCase(offDay)))
    );;;
  }

  addDayOff(dayOff: Date): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Format the date as YYYY-MM-DD
    const formattedDate = format(dayOff, 'yyyy-MM-dd');

    return this.http
      .get<any>(`${this.apiUrl}/OffDay/SetOffDay?date=${formattedDate}`, {
        headers,
      })
      .pipe(
        catchError((error) => {
          // Handle the error and extract the message
          const errorMessage = error.error.message || 'An error occurred';
          return throwError(errorMessage);
        })
      );
  }

  removeDayOff(dayOff: Date): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.apiUrl}/OffDay/RemoveOffDay?date=${dayOff}`, {
      headers,
    });
  }

  private mapToPascalCase(offDay: any): OffDayDto {
    return {
      Id: offDay.id,
      Day: offDay.day,
    } as OffDayDto;
  }
}
