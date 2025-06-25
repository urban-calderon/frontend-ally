import { Component, inject } from '@angular/core';
import { WeatherService } from '../../services/index.service';
import { WeatherCountrySelectedResponse } from '../../interfaces';

@Component({
  selector: 'ally-selected-country',
  standalone: false,
  templateUrl: './selected-country.component.html',
  styleUrl: './selected-country.component.css'
})
export class SelectedCountryComponent {

  public titleSelectedCountry: string = 'País seleccionado';
  private weatherService = inject(WeatherService);
  public weatherData: WeatherCountrySelectedResponse | null = null;

  ngOnInit(): void {
    this.loadWeatherApi();
  }

  loadWeatherApi() {
    this.weatherService.getSelectedCountry('Ciudad de Mexico').subscribe({
      next: (response: WeatherCountrySelectedResponse[]) => {
        this.weatherData = response[0];
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
