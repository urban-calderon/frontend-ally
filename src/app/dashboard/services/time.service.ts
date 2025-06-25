import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { TimeZoneDetailResponse, ZoneInfo } from '../interfaces';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  private readonly baseUrl: string = environment.API_URL_TIME_ZONE;
  private api_key: string = environment.API_KEY_TIME_ZONE;
  private format: string = 'json';

  constructor(private http: HttpClient) { }

  getTimesZones(codeCountry: string) {

    const url = `${this.baseUrl}/v2.1/list-time-zone?key=${this.api_key}&format=${this.format}&country=${codeCountry}`;

    return this.http.get<{zones: ZoneInfo[]}>(url).pipe(
      map(response => response.zones.map(zone => zone.zoneName)),
      catchError(err => {
        console.error('Error obteniendo zonas horarias:', err);
        return throwError(() => 'No se pudieron obtener las zonas horarias');
      })
    );
  }

  getTime(zoneName: string) {
    const url = `${this.baseUrl}/v2.1/get-time-zone?key=${this.api_key}&format=json&by=zone&zone=${zoneName}`;

    return this.http.get<TimeZoneDetailResponse>(url).pipe(
      catchError(err => {
        console.error('Error obteniendo hora:', err);
        return throwError(() => 'Error al obtener la hora');
      })
    );
  }
}
