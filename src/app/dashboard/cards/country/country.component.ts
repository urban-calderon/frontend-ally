import { Component, inject } from '@angular/core';
import { CountryService } from '../../services/index.service';
import { Country, CountryResponse } from '../../interfaces';
import { SharedStateService } from '../../services/shared-state.service';

@Component({
  selector: 'ally-country',
  standalone: false,
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {
  public titleAvailableCountry: string = 'Países disponibles';
  private countrieService = inject(CountryService);
  private sharedState = inject(SharedStateService);
  public countries: Country[] = [];
  public selectedCountry: Country | null = null;

  ngOnInit(): void {
    this.loadCountries();

    this.sharedState.selectedCountry$.subscribe(country => {
      this.selectedCountry = country;
    });
  }

  loadCountries() {
    this.countrieService.getCountries().subscribe({
      next: (response: CountryResponse) => {
        this.countries = response.data;
        this.highlightDefaultCountry();
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  selectCountry(country: Country) {
    this.sharedState.setSelectedCountry(country);
  }

  getFlagImage(countryCode: string): string {
    return `/images/flags/${countryCode.toLowerCase()}.png`;
  }

  private highlightDefaultCountry() {
    const mexico = this.countries.find(c => c.code === 'MX');
    if (mexico) {
      this.selectedCountry = mexico;
    }
  }

  isSelected(country: Country): boolean {
    return this.selectedCountry?.code === country.code;
  }
}
