import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HittersService } from './services/hitters.service';
import { GamesComponent } from './components/games/games.component';
import { OddsComponent } from './components/odds/odds.component';
import { HitterHitComponent } from './components/hitter-hit/hitter-hit.component';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HitterHitComponent,OddsComponent,GamesComponent,NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'goodLooks';
  view : string = 'hitters'
  pitchers : any= []
  constructor(private HittersService: HittersService) { }
  ngOnInit(): void {
    this.setIconsApiHitters()
    this.setIconsApiPitchers()
    this.setIconsApiVersus()


    //this.playersIcons = Object.values(icons) //offline
  }
  playersHitters: any= []
  playersPitchers: any= []
  playersVersus: any= []

  setIconsApiHitters(){
    this.HittersService.getHitters().subscribe((data)=>{
      this.playersHitters = data
      console.log(data)
    })
  }
  setIconsApiPitchers(){
    this.HittersService.getPitchers().subscribe((data)=>{
      this.playersPitchers = data
    })
  }
  setIconsApiVersus(){
    this.HittersService.getVersus().subscribe((data)=>{
      this.playersVersus = data

    })
  }


  setView(view: string){
    this.view = view
    console.log(this.view)
  }
}
