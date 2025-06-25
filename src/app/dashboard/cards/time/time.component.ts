import { Component, inject } from '@angular/core';
import { TimeService } from '../../services/time.service';
import { TimeZoneDetailResponse } from '../../interfaces';
import { SharedStateService } from '../../services/index.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ally-time',
  standalone: false,
  templateUrl: './time.component.html',
  styleUrl: './time.component.css'
})
export class TimeComponent {

  public titleTime: string = 'Hora';
  public currentTime: string = '';
  public timeZone: string = '';
  private timeService = inject(TimeService);
  private sharedState = inject(SharedStateService);

  ngOnInit(): void {
    this.sharedState.selectedTimeZone$.pipe(
      debounceTime(1000), // Espera 1 segundo entre cambios
      distinctUntilChanged() // Solo actúa si la zona realmente cambió
    ).subscribe(zone => {
      if (zone) {
        this.loadTimeData(zone);
      }
    });
  }

  loadTimeData(zoneName: string) {
    this.timeService.getTime(zoneName).subscribe({
      next: (response: TimeZoneDetailResponse) => {
        this.currentTime = this.formatDateTime(response.formatted);
        this.timeZone = response.zoneName;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  private formatDateTime(dateString: any): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }
}
