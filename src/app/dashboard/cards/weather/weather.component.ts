import { Component, inject } from '@angular/core';
import { WeatherResponse } from '../../interfaces';
import { WeatherService } from '../../services/index.service';

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

  ngOnInit(): void {
    this.loadWeather();
  }

  loadWeather() {
    this.weatherService.getWeather(19.43, -99.13).subscribe({
      next: (response: WeatherResponse) => {
        this.weatherData = response;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  getTemperature(): number {
    return this.weatherData?.main?.temp ?? 0;
  }

  getMinTemperature(): number {
    return this.weatherData?.main?.temp_min ?? 0;
  }

  getMaxTemperature(): number {
    return this.weatherData?.main?.temp_max ?? 0;
  }
}
