import { Component, Input } from '@angular/core';

@Component({
  selector: 'ally-spinner',
  standalone: false,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent  {

  @Input() isLoading: boolean = false;
}
