import { Component, Input } from '@angular/core';

@Component({
  selector: 'ally-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() title: string = '';
}
