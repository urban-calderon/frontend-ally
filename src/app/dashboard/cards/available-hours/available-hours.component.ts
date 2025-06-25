import { Component, inject } from '@angular/core';
import { TimeService } from '../../services/index.service';

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

  ngOnInit(): void {
    this.loadTimesZones();
  }

  loadTimesZones() {
    this.timeService.getTimesZones('MX').subscribe({
      next: (zones: string[]) => {
        this.timeZones = zones;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
