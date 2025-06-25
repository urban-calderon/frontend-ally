import { Component, inject } from '@angular/core';
import { SharedStateService, TimeService } from '../../services/index.service';
import { debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'ally-available-hours',
  standalone: false,
  templateUrl: './available-hours.component.html',
  styleUrl: './available-hours.component.css'
})
export class AvailableHoursComponent {

  public titleAvailableTimeZones: string  = 'Zonas horarias disponibles';
  public timeZones: string[] = [];
  private timeService = inject(TimeService);
  public selectedTimeZone: string | null = null;
  private sharedState = inject(SharedStateService);

  ngOnInit(): void {
    this.sharedState.selectedCountry$.pipe(
      debounceTime(1000) // Espera 1 segundo después del último cambio
    ).subscribe(country => {
      if (country) {
        this.loadTimeZones(country.code);
      }
    });
  }

  private loadTimeZones(countryCode: string) {
    this.timeService.getTimesZones(countryCode).pipe(
      take(1)
    ).subscribe({
      next: (zones) => {
        this.timeZones = zones;
        if (zones.length > 0) {
          this.selectedTimeZone = zones[0];
          this.sharedState.setSelectedTimeZone(zones[0]);
        }
      },
      error: (error) => console.error('Error obteniendo zonas horarias:', error)
    });
  }

  selectTimeZone(zone: string) {
    if (this.selectedTimeZone !== zone) {
      this.selectedTimeZone = zone;
      this.sharedState.setSelectedTimeZone(zone);
    }
  }
}
