import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Country } from '../interfaces';
import { WeatherService, TimeService } from '../services/index.service';

@Injectable({
  providedIn: 'root'
})
export class SharedStateService {

  private selectedCountrySubject = new BehaviorSubject<Country | null>(null);
  selectedCountry$ = this.selectedCountrySubject.asObservable();

  private selectedTimeZoneSubject = new BehaviorSubject<string | null>(null);
  selectedTimeZone$ = this.selectedTimeZoneSubject.asObservable().pipe(
    debounceTime(1000),
    distinctUntilChanged()
  );

  private defaultCountry: Country = {
    id: 1,
    code: 'MX',
    name: 'México',
    city: 'Ciudad de México',
    lat: 19.4326,
    lon: -99.1332
  };

  constructor(
    private weatherService: WeatherService,
    private timeService: TimeService
  ) {
    this.setSelectedCountry(this.defaultCountry);
  }

  setSelectedCountry(country: Country) {
    this.selectedCountrySubject.next(country);

    if (!country.lat || !country.lon) {
      this.weatherService.getSelectedCountry(country.city).subscribe({
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
  }

  setSelectedTimeZone(zone: string) {
    this.selectedTimeZoneSubject.next(zone);
  }
}
