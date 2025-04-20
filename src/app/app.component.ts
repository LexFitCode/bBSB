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
  playersToView : any = []
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
    if(this.view !== view){
      if(view === "Pitchers"){
        this.view = view
        this.playersVersus.forEach((element: any) => {
          let playerStats : any = {}
          const game = element.game
          const odds = element.odds
          const games = element.games
          const gamesvS = element.gamesvS
          if(odds !== null){
            odds.forEach((element: any) => {
              playerStats.name = element.name
              playerStats.game = game
              if(element.market === "Pitcher - Ponches (+/-)"){
                playerStats.strikeOut = {}
                playerStats.strikeOut.market = "StrikeOuts"
                playerStats.strikeOut.line = element.line
                playerStats.strikeOut.over = element.overOdd
                playerStats.strikeOut.under = element.underOdd
                playerStats.strikeOut.under = element.underOdd
                playerStats.strikeOut.under = element.underOdd
                playerStats.strikeOut.games = {
                  "game1" : games.game1?.strikeOuts,
                  "game2" : games.game2.strikeOuts2,
                  "game3" : games.game3.strikeOuts3,
                  "game4" : games.game4.strikeOuts4,
                  "game5" : games.game5.strikeOuts5
                }
                playerStats.strikeOut.gamesvS = {
                  "game1" : gamesvS?.game1.strikeOuts,
                  "game2" : gamesvS?.game2.strikeOuts2,
                  "game3" : gamesvS?.game3.strikeOuts3,
                  "game4" : gamesvS?.game4.strikeOuts4,
                  "game5" : gamesvS?.game5.strikeOuts5
                }
  
              }
              /*if(element.market === "Pitcher - Outs (+/-)"){
                playerStats.out = {}
                playerStats.out.market = "Outs"
                playerStats.out.line = element.line
                playerStats.out.over = element.overOdd
                playerStats.out.under = element.underOdd
                playerStats.outs.games = {
                  "game1" : games.game1?.outs,
                  "game2" : games.game2.outs2,
                  "game3" : games.game3.outs3,
                  "game4" : games.game4.outs4,
                  "game5" : games.game5.outs5
                }
                playerStats.outs.gamesvS = {
                  "game1" : gamesvS?.game1.outs,
                  "game2" : gamesvS?.game2.outs2,
                  "game3" : gamesvS?.game3.outs3,
                  "game4" : gamesvS?.game4.outs4,
                  "game5" : gamesvS?.game5.outs5
                }
              }*/
              if(element.market === "Pitcher - Base por bolas (+/-)"){
                playerStats.walk = {}
                playerStats.walk.market = "Walk"
                playerStats.walk.line = element.line
                playerStats.walk.over = element.overOdd
                playerStats.walk.under = element.underOdd
                playerStats.walk.games = {
                  "game1" : games.game1?.baseXBola,
                  "game2" : games.game2?.baseXBola2,
                  "game3" : games.game3?.baseXBola3,
                  "game4" : games.game4?.baseXBola4,
                  "game5" : games.game5?.baseXBola5
                }
                playerStats.walk.gamesvS = {
                  "game1" : gamesvS?.game1?.baseXBola,
                  "game2" : gamesvS?.game2?.baseXBola2,
                  "game3" : gamesvS?.game3?.baseXBola3,
                  "game4" : gamesvS?.game4?.baseXBola4,
                  "game5" : gamesvS?.game5?.baseXBola5
                }
              }
              if(element.market === "Pitcher - Carreras limpias"){
                playerStats.earnedRun = {}
                playerStats.earnedRun.market = "Earned Runs"
                playerStats.earnedRun.line = element.line
                playerStats.earnedRun.over = element.overOdd
                playerStats.earnedRun.under = element.underOdd
                playerStats.earnedRun.games = {
                  "game1" : games.game1?.earnedRuns,
                  "game2" : games.game2.earnedRuns2,
                  "game3" : games.game3.earnedRuns3,
                  "game4" : games.game4.earnedRuns4,
                  "game5" : games.game5.earnedRuns5
                }
                playerStats.earnedRun.gamesvS = {
                  "game1" : gamesvS?.game1.earnedRuns,
                  "game2" : gamesvS?.game2.earnedRuns2,
                  "game3" : gamesvS?.game3.earnedRuns3,
                  "game4" : gamesvS?.game4.earnedRuns4,
                  "game5" : gamesvS?.game5.earnedRuns5
                }
              }
              if(element.market === "Pitcher - Hits permitidos (+/-)"){
                playerStats.hitsAllowed = {}
                playerStats.hitsAllowed.market = "Hits Allowed"
                playerStats.hitsAllowed.line = element.line
                playerStats.hitsAllowed.over = element.overOdd
                playerStats.hitsAllowed.under = element.underOdd
                playerStats.hitsAllowed.games = {
                  "game1" : games.game1?.hitsAllowed,
                  "game2" : games.game2.hitsAllowed2,
                  "game3" : games.game3.hitsAllowed3,
                  "game4" : games.game4.hitsAllowed4,
                  "game5" : games.game5.hitsAllowed5
                }
                playerStats.hitsAllowed.gamesvS = {
                  "game1" : gamesvS?.game1.hitsAllowed,
                  "game2" : gamesvS?.game2.hitsAllowed2,
                  "game3" : gamesvS?.game3.hitsAllowed3,
                  "game4" : gamesvS?.game4.hitsAllowed4,
                  "game5" : gamesvS?.game5.hitsAllowed5
                }
              }
  
  
            });
          }
          console.log(playerStats)
          this.playersToView.push(playerStats)
        });
        console.log(this.playersToView)
      } else if(view === "Hitters"){
        this.view = view
        console.log(this.playersHitters)
      }
    }
  }
}
