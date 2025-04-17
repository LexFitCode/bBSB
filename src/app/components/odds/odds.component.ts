import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-odds',
  imports: [],
  templateUrl: './odds.component.html',
  styleUrl: './odds.component.scss'
})
export class OddsComponent {
  @Input() odds: any
}
