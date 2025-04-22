import { Component, Input } from '@angular/core';
import { GamesComponent } from '../games/games.component';
import { VsPitcherComponent } from '../vs-pitcher/vs-pitcher.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-odds',
  imports: [GamesComponent, VsPitcherComponent, NgClass],
  templateUrl: './odds.component.html',
  styleUrl: './odds.component.scss'
})
export class OddsComponent {
  @Input() odds: any
  @Input() cover: any
}
