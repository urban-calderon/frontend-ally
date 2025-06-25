import { Component, inject } from '@angular/core';
import { CountryService } from '../../services/index.service';
import { Country, CountryResponse } from '../../interfaces';

@Component({
  selector: 'ally-country',
  standalone: false,
  templateUrl: './country.component.html',
  styleUrl: './country.component.css'
})
export class CountryComponent {

  public titleAvailableCountry: string = 'Países disponibles';

  private countrieService = inject(CountryService);
  public countries: Country[] = [];

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.countrieService.getCountries().subscribe({
      next: (response: CountryResponse) => {
        this.countries = response.data;
        //console.log('Paises:', this.countries);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  selectCountry(country: Country) {
    console.log('Hola mundo - País seleccionado:', country.name);
  }

  getFlagImage(countryCode: string): string {
    return `/images/flags/${countryCode.toLowerCase()}.png`;
  }
}
