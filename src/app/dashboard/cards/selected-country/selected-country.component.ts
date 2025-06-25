import { Component, inject, OnInit } from '@angular/core';
import { SharedStateService } from '../../services/index.service';
import { Country } from '../../interfaces';

@Component({
  selector: 'ally-selected-country',
  standalone: false,
  templateUrl: './selected-country.component.html',
  styleUrl: './selected-country.component.css'
})
export class SelectedCountryComponent implements OnInit {

  public titleSelectedCountry: string = 'País seleccionado';
  private sharedState = inject(SharedStateService);
  public selectedCountry: Country | null = null;

  ngOnInit(): void {
    this.sharedState.selectedCountry$.subscribe(country => {
      this.selectedCountry = country;
    });
  }
}
