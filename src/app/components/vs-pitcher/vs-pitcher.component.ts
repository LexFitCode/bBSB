import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vs-pitcher',
  imports: [],
  templateUrl: './vs-pitcher.component.html',
  styleUrl: './vs-pitcher.component.scss'
})
export class VsPitcherComponent {
  @Input() gamesvsPitcher : any
  @Input() gamesvsThrow : any
}
