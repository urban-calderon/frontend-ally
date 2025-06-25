import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Country, WeatherCountrySelectedResponse } from '../interfaces';
import { WeatherService, TimeService } from '../services/index.service';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {

  private selectedCountrySubject = new BehaviorSubject<WeatherCountrySelectedResponse | null>(null);
  selectedCountry$ = this.selectedCountrySubject.asObservable();

  private selectedTimeZoneSubject = new BehaviorSubject<string | null>(null);
  selectedTimeZone$ = this.selectedTimeZoneSubject.asObservable();

  constructor(
    private weatherService: WeatherService,
    private timeService: TimeService
  ) {}

  setSelectedCountry(country: WeatherCountrySelectedResponse) {
    this.selectedCountrySubject.next(country);

    // Obtener coordenadas para el país seleccionado
    this.weatherService.getSelectedCountry(country.name).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          const weatherData = response[0];
          this.selectedCountrySubject.next({
            ...country,
            lat: weatherData.lat,
            lon: weatherData.lon
          });
        }
      },
      error: (error) => console.error('Error obteniendo coordenadas:', error)
    });
  }

  setSelectedTimeZone(zone: string) {
    this.selectedTimeZoneSubject.next(zone);
  }
}
