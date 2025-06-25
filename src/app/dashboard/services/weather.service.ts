import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { WeatherCountrySelectedResponse } from '../interfaces/weather-selected-country-response.interface';
import { catchError, throwError } from 'rxjs';
import { WeatherResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly baseUrl: string = environment.API_URL_WEATHER;
  private limit: number = 1;
  private api_key: string = environment.API_KEY_WEATHER;

  constructor(private http: HttpClient) { }

  getSelectedCountry(city: string) {
    const url = `${this.baseUrl}/geo/1.0/direct?q=${city}&limit=${this.limit}&appid=${this.api_key}`;

    return this.http.get<WeatherCountrySelectedResponse[]>(url).pipe(
      catchError(err => throwError(() => err.error.message || 'Error en el servicio openweather'))
    );
  }

  getWeather(latitude: number, longitude: number) {

    const url = `${this.baseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${environment.API_KEY_WEATHER}`;

    return this.http.get<WeatherResponse>(url).pipe(
      catchError(err => throwError(() => err.error.message || 'Error en el servicio openweather'))
    );
  }
}
