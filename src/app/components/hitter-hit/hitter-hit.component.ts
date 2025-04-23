import { Component, Input } from '@angular/core';
import { VsPitcherComponent } from '../vs-pitcher/vs-pitcher.component';
import { OddsComponent } from '../odds/odds.component';
import { GamesComponent } from '../games/games.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-hitter-hit',
  imports: [GamesComponent,OddsComponent, VsPitcherComponent,NgClass],
  templateUrl: './hitter-hit.component.html',
  styleUrl: './hitter-hit.component.scss'
})
export class HitterHitComponent {
  @Input() playersHitters :any
}
