import { Component, inject } from '@angular/core';
import { WeatherResponse } from '../../interfaces';
import { SharedStateService, WeatherService } from '../../services/index.service';

@Component({
  selector: 'ally-weather',
  standalone: false,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent {

  public titleWeather: string = 'Clima';
  public weatherData: WeatherResponse | null = null;
  private weatherService = inject(WeatherService);
  private sharedState = inject(SharedStateService);

  ngOnInit(): void {
    this.sharedState.selectedCountry$.subscribe(country => {
      if (country?.lat && country?.lon) {
        this.loadWeather(country.lat, country.lon);
      }
    });
  }

  loadWeather(lat: number, lon: number) {
    this.weatherService.getWeather(lat, lon).subscribe({
      next: (response: WeatherResponse) => {
        this.weatherData = response;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
