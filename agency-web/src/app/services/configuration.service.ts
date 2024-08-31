import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { map } from 'rxjs/operators';
import { ConfigurationDto } from '../models/configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getConfigurations(): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/Configuration/getConfigurations`, { headers })
    .pipe(
      map(configs => configs.map(config => this.mapToPascalCase(config)))
    );;
  }

  updateConfiguration(dto: any): Observable<void> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<void>(`${this.apiUrl}/Configuration/updateConfiguration`, dto, { headers });
  }

  private mapToPascalCase(config: any): ConfigurationDto {
    return {
      Id: config.id,
      PropertyName: config.propertyName,
      Value: config.value,
    } as ConfigurationDto;
  }
}
