import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigurationDto } from '../models/configuration';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  setConfiguration(config: ConfigurationDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Configuration/SetConfiguration`, config);
  }
}
