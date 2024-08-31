import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OffDayDto } from '../models/offday';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OffDayService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  setOffDay(offDay: OffDayDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/OffDay/SetOffDay`, offDay);
  }
}
