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
  games : any = []
  constructor(private HittersService: HittersService) { }
  ngOnInit(): void {
    this.setIconsApiHitters()
    this.setIconsApiPitchers()
    this.setIconsApiVersus()
    this.setIconsApiGames()

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
  setIconsApiGames(){
    this.HittersService.getGames().subscribe((data)=>{
      this.games = this.setLogo(data)
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
      this.playersToView = []
      if(view === "Pitchers"){
        this.view = view
        this.playersVersus.forEach((element2: any) => {
          let playerStats : any = []
          const game = element2.game
          const odds = element2.odds
          const games = element2.games
          const gamesvS = element2.gamesvS
          playerStats.odds = []
          playerStats.rival = element2.rival
          console.log(element2)
          if(odds !== null){
            playerStats.players = element2.players
            odds.forEach((element: any) => {
              playerStats.name = element.name
              playerStats.team = element2.team.replace("2025 ","")
              playerStats.game = game
              if(element.market === "Pitcher - Ponches (+/-)"){
                const props =  {
                  "rival" : element2.rival,
                  "market" : "Strikeouts",
                  "line" : parseFloat(element.line),
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover" : this.setCover(games.game1.strikeOuts,
                    games.game2.strikeOuts2,
                    games.game3.strikeOuts3,
                    games.game4.strikeOuts4,
                    games.game5.strikeOuts5, element.line),
                  "coverVs" : this.setCover(gamesvS.game1.strikeOuts,
                    gamesvS.game2.strikeOuts2,
                    gamesvS.game3.strikeOuts3,
                    gamesvS.game4.strikeOuts4,
                    gamesvS.game5.strikeOuts5, element.line),
                  "games" :{
                    "game1" : games.game1?.strikeOuts,
                    "game2" : games.game2.strikeOuts2,
                    "game3" : games.game3.strikeOuts3,
                    "game4" : games.game4.strikeOuts4,
                    "game5" : games.game5.strikeOuts5
                  },
                  "gamesvS" : {
                    "game1" : gamesvS?.game1.strikeOuts,
                    "game2" : gamesvS?.game2.strikeOuts2,
                    "game3" : gamesvS?.game3.strikeOuts3,
                    "game4" : gamesvS?.game4.strikeOuts4,
                    "game5" : gamesvS?.game5.strikeOuts5
                  }
                }
                playerStats.odds.push(props)
              }
              if(element.market === "Pitcher - Outs (+/-)"){
                const props =  {
                  "rival" : element2.rival,
                  "market" : "Outs",
                  "line" : parseFloat(element.line),
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                 /* "cover" :this.setCover(games.game1.baseXBola,
                    games.game2.baseXBola2,
                    games.game3.baseXBola3,
                    games.game4.baseXBola4,
                    games.game5.baseXBola5, element.line),
                  "coverVs" : this.setCover(gamesvS.game1.baseXBola,
                    gamesvS.game2.baseXBola2,
                    gamesvS.game3.baseXBola3,
                    gamesvS.game4.baseXBola4,
                    gamesvS.game5.baseXBola5, element.line),*/
                  "games" :{
                    "game1" : games.game1?.outs,
                    "game2" : games.game2.outs2,
                    "game3" : games.game3.outs3,
                    "game4" : games.game4.outs4,
                    "game5" : games.game5.outs5
                  },
                  "gamesvS" : {
                    "game1" : gamesvS?.game1.outs,
                    "game2" : gamesvS?.game2.outs2,
                    "game3" : gamesvS?.game3.outs3,
                    "game4" : gamesvS?.game4.outs4,
                    "game5" : gamesvS?.game5.outs5
                  }
                }
                playerStats.odds.push(props)
              }
              if(element.market === "Pitcher - Base por bolas (+/-)"){
                const props =  {
                  "rival" : element2.rival,
                  "market" : "Walks",
                  "line" : parseFloat(element.line),
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover" :this.setCover(games.game1.baseXBola,
                    games.game2.baseXBola2,
                    games.game3.baseXBola3,
                    games.game4.baseXBola4,
                    games.game5.baseXBola5, element.line),
                  "coverVs" : this.setCover(gamesvS.game1.baseXBola,
                    gamesvS.game2.baseXBola2,
                    gamesvS.game3.baseXBola3,
                    gamesvS.game4.baseXBola4,
                    gamesvS.game5.baseXBola5, element.line),
                  "games" :{
                    "game1" : games.game1?.baseXBola,
                    "game2" : games.game2.baseXBola2,
                    "game3" : games.game3.baseXBola3,
                    "game4" : games.game4.baseXBola4,
                    "game5" : games.game5.baseXBola5
                  },
                  "gamesvS" : {
                    "game1" : gamesvS?.game1.baseXBola,
                    "game2" : gamesvS?.game2.baseXBola2,
                    "game3" : gamesvS?.game3.baseXBola3,
                    "game4" : gamesvS?.game4.baseXBola4,
                    "game5" : gamesvS?.game5.baseXBola5
                  }
                }
                playerStats.odds.push(props)
              }
              if(element.market === "Pitcher - Carreras limpias"){
                const props =  {
                  "market" : "Earned runs",
                  "rival" : element2.rival,
                  "line" : parseFloat(element.line),
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover" : this.setCover(games.game1.earnedRuns,
                    games.game2.earnedRuns2,
                    games.game3.earnedRuns3,
                    games.game4.earnedRuns4,
                    games.game5.earnedRuns5, element.line),
                  "coverVs" : this.setCover(gamesvS.game1.earnedRuns,
                    gamesvS.game2.earnedRuns2,
                    gamesvS.game3.earnedRuns3,
                    gamesvS.game4.earnedRuns4,
                    gamesvS.game5.earnedRuns5, element.line),
                  "games" :{
                    "game1" : games.game1?.earnedRuns,
                    "game2" : games.game2.earnedRuns2,
                    "game3" : games.game3.earnedRuns3,
                    "game4" : games.game4.earnedRuns4,
                    "game5" : games.game5.earnedRuns5
                  },
                  "gamesvS" : {
                    "game1" : gamesvS?.game1.earnedRuns,
                    "game2" : gamesvS?.game2.earnedRuns2,
                    "game3" : gamesvS?.game3.earnedRuns3,
                    "game4" : gamesvS?.game4.earnedRuns4,
                    "game5" : gamesvS?.game5.earnedRuns5
                  }
                }
                playerStats.odds.push(props)
              }
              if(element.market === "Pitcher - Hits permitidos (+/-)"){
                const props =  {
                  "market" : "Hits Allowed",
                  "rival" : element2.rival,
                  "line" : parseFloat(element.line),
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover" : this.setCover(games.game1.hitsAllowed,
                    games.game2.hitsAllowed2,
                    games.game3.hitsAllowed3,
                    games.game4.hitsAllowed4,
                    games.game5.hitsAllowed5, element.line),
                  "coverVs" : this.setCover(gamesvS.game1.hitsAllowed,
                    gamesvS.game2.hitsAllowed2,
                    gamesvS.game3.hitsAllowed3,
                    gamesvS.game4.hitsAllowed4,
                    gamesvS.game5.hitsAllowed5, element.line),
                  "games" :{
                    "game1" : games.game1?.hitsAllowed,
                    "game2" : games.game2.hitsAllowed2,
                    "game3" : games.game3.hitsAllowed3,
                    "game4" : games.game4.hitsAllowed4,
                    "game5" : games.game5.hitsAllowed5
                  },
                  "gamesvS" : {
                    "game1" : gamesvS?.game1.hitsAllowed,
                    "game2" : gamesvS?.game2.hitsAllowed2,
                    "game3" : gamesvS?.game3.hitsAllowed3,
                    "game4" : gamesvS?.game4.hitsAllowed4,
                    "game5" : gamesvS?.game5.hitsAllowed5
                  }
                }
                playerStats.odds.push(props)
              }
            });
          }
          this.playersToView.push(playerStats)

        });
      } else if(view === "Hitters"){
        this.view = view
        this.playersHitters.forEach((element2: any) => {
          let playerStats : any = {}
          const game = element2.game
          const odds = element2.odds
          const games = element2.games
          const vsPitcher = element2.vsPitcher
          const vsThrow = element2.vsPitcherThrow

          playerStats.odds = []
          if(odds !== null){
            odds.forEach((element: any) => {
              playerStats.name = element.name
              playerStats.team = element2.team.replace("2025 ","")
              playerStats.rival = vsPitcher.vsPlayer,
              playerStats.rivalAvg = vsPitcher.avg,
              playerStats.rivalThrow = vsThrow.vsPlayer,
              playerStats.rivalThrowAvg = vsThrow.avg,
              playerStats.game = game
              if(element.market === "Home runs (+/-)"){
                const props = {
                  "rival" : element.rival,
                  "market" : "Home run",
                  "line" : element.line,
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover" : this.setCover(games.game1.homeRun,
                    games.game2.homeRun2,
                    games.game3.homeRun3,
                    games.game4.homeRun4,
                    games.game5.homeRun5, element.line),
                  "games" : {
                    "game1" : games.game1.homeRun,
                    "game2" : games.game2.homeRun2,
                    "game3" : games.game3.homeRun3,
                    "game4" : games.game4.homeRun4,
                    "game5" : games.game5.homeRun5,

                  },
                  "gamesvsPitcher" : {
                    "stats" : vsPitcher?.homeRun,
                    "games" : vsPitcher?.games,
                    "avg" : vsPitcher?.avg,
                    "vsPlayer" : vsPitcher?.vsPlayer
                  },

                  "gamesvsThrow" : {
                    "stats" : vsThrow?.homeRun,
                    "games" : vsThrow?.games,
                    "avg" : vsThrow?.avg,
                    "vsPlayer" : vsThrow?.vsPlayer
                  },
                }
                playerStats.odds.push(props)

              }
              if(element.market === "Total de bases (+/-)"){
                const props = {
                  "rival" : element.rival,
                  "market" : "Total Bases",
                  "line" : element.line,
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "games" : {
                    "game1" : games.game1?.homeRun,
                    "game2" : games.game2.homeRun2,
                    "game3" : games.game3.homeRun3,
                    "game4" : games.game4.homeRun4,
                    "game5" : games.game5.homeRun5
                  },
                  "gamesvsPitcher" : vsPitcher?.homeRun,
                  "gamesvsThrow" : vsThrow?.homeRun
                }
                playerStats.odds.push(props)
              }
              if(element.market === "Hits (+/-)"){
                const props = {
                  "rival" : element.rival,
                  "market" : "Hits",
                  "line" : element.line,
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover" : this.setCover(games.game1.hits,
                      games.game2.hits2,
                      games.game3.hits3,
                      games.game4.hits4,
                      games.game5.hits5, element.line),
                  "games" : {
                    "game1" : games.game1?.hits,
                    "game2" : games.game2.hits2,
                    "game3" : games.game3.hits3,
                    "game4" : games.game4.hits4,
                    "game5" : games.game5.hits5

                  },
                  "gamesvsPitcher" : {
                    "stats" : vsPitcher?.Hits,
                    "games" : vsPitcher?.games,
                    "avg" : vsPitcher?.avg,
                    "vsPlayer" : vsPitcher?.vsPlayer
                  },

                  "gamesvsThrow" : {
                    "stats" : vsThrow?.Hits,
                    "games" : vsThrow?.games,
                    "avg" : vsThrow?.avg,
                    "vsPlayer" : vsThrow?.vsPlayer
                  },
                }
                playerStats.odds.push(props)
              }
              if(element.market ===  "Carreras (+/-)"){
                const props = {
                  "rival" : element.rival,
                  "market" : "Runs",
                  "line" : element.line,
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover" : this.setCover(games.game1.runs,
                    games.game2.runs2,
                    games.game3.runs3,
                    games.game4.runs4,
                    games.game5.runs5, element.line),
                  "games" : {
                    "game1" : games.game1?.runs,
                    "game2" : games.game2.runs2,
                    "game3" : games.game3.runs3,
                    "game4" : games.game4.runs4,
                    "game5" : games.game5.runs5
                  },
                }
                playerStats.odds.push(props)
              }
              if(element.market === "Carreras impulsadas (+/-)"){
                const props = {
                  "rival" : element.rival,
                  "market" : "RBI",
                  "line" : element.line,
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover": this.setCover(games.game1.runsBattedIn,
                    games.game2.runsBattedIn2,
                    games.game3.runsBattedIn3,
                    games.game4.runsBattedIn4,
                    games.game5.runsBattedIn5, element.line),
                  "games" : {
                    "game1" : games.game1?.runsBattedIn,
                    "game2" : games.game2.runsBattedIn2,
                    "game3" : games.game3.runsBattedIn3,
                    "game4" : games.game4.runsBattedIn4,
                    "game5" : games.game5.runsBattedIn5
                  },
                  "gamesvsPitcher" : {
                    "stats" : vsPitcher?.runsBattedIn,
                    "games" : vsPitcher?.games,
                    "avg" : vsPitcher?.avg,
                    "vsPlayer" : vsPitcher?.vsPlayer
                  },

                  "gamesvsThrow" : {
                    "stats" : vsThrow?.runsBattedIn,
                    "games" : vsThrow?.games,
                    "avg" : vsThrow?.avg,
                    "vsPlayer" : vsThrow?.vsPlayer
                  },
                }
                playerStats.odds.push(props)
              }
              if(element.market === "Bases robadas (+/-)"){
                const props = {
                  "rival" : element.rival,
                  "market" : "Stolen Bases",
                  "line" : element.line,
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover" : this.setCover(games.game1.stolenBases,
                    games.game2.stolenBases2,
                    games.game3.stolenBases3,
                    games.game4.stolenBases4,
                    games.game5.stolenBases5, element.line),
                  "games" : {
                    "game1" : games.game1?.sb,
                    "game2" : games.game2.sb2,
                    "game3" : games.game3.sb3,
                    "game4" : games.game4.sb4,
                    "game5" : games.game5.sb5
                  }
                }
                playerStats.odds.push(props)
              }
              if(element.market === "Total - Hits, carreras y carreras impulsadas (+/-)"){
                const props = {
                  "market" : "HRR",
                  "line" : element.line,
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover" : this.setCover(this.toNumber(games.game1?.hits) + this.toNumber(games.game1?.runs) + this.toNumber(games.game1.runsBattedIn),
                    this.toNumber(games.game2.hits2) + this.toNumber(games.game2.runs2) + this.toNumber(games.game2.runsBattedIn2),
                    this.toNumber(games.game3.hits3) + this.toNumber(games.game3.runs3) + this.toNumber(games.game3.runsBattedIn3),
                    this.toNumber(games.game4.hits4) + this.toNumber(games.game4.runs4) + this.toNumber(games.game4.runsBattedIn4),
                    this.toNumber(games.game5.hits5) + this.toNumber(games.game5.runs5) + this.toNumber(games.game5.runsBattedIn5), element.line),
                  "games" : {
                    "game1" : this.toNumber(games.game1?.hits) + this.toNumber(games.game1?.runs) + this.toNumber(games.game1.runsBattedIn),
                    "game2" : this.toNumber(games.game2.hits2) + this.toNumber(games.game2.runs2) + this.toNumber(games.game2.runsBattedIn2),
                    "game3" : this.toNumber(games.game3.hits3) + this.toNumber(games.game3.runs3) + this.toNumber(games.game3.runsBattedIn3),
                    "game4" : this.toNumber(games.game4.hits4) + this.toNumber(games.game4.runs4) + this.toNumber(games.game4.runsBattedIn4),
                    "game5" : this.toNumber(games.game5.hits5) + this.toNumber(games.game5.runs5) + this.toNumber(games.game5.runsBattedIn5)
                  },
                  "gamesvsPitcher" : {
                    "stats" : this.toNumber(vsPitcher?.Hits) + this.toNumber(vsPitcher?.runsBattedIn),
                    "games" : vsPitcher.games
                  },
                  "gamesvsThrow" : {
                    "stats" : this.toNumber(vsThrow?.Hits) + this.toNumber(vsThrow?.runsBattedIn),
                    "games" : vsThrow.games
                  },
                }
                playerStats.odds.push(props)
              }
              if(element.market === "Bateador - Ponches (+/-)"){
                const props = {
                  "rival" : element.rival,
                  "market" : "StrikeOuts",
                  "line" : element.line,
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover" : this.setCover(games.game1.strikeOuts,
                    games.game2.strikeOuts2,
                    games.game3.strikeOuts3,
                    games.game4.strikeOuts4,
                    games.game5.strikeOuts5, element.line),
                  "games" : {
                    "game1" : games.game1?.strikeOuts,
                    "game2" : games.game2.strikeOuts2,
                    "game3" : games.game3.strikeOuts3,
                    "game4" : games.game4.strikeOuts4,
                    "game5" : games.game5.strikeOuts5
                  },
                  "gamesvsPitcher" : {
                    "stats" : vsPitcher?.strikeOut,
                    "games" : vsPitcher?.games,
                    "avg" : vsPitcher?.avg,
                    "vsPlayer" : vsPitcher?.vsPlayer
                  },

                  "gamesvsThrow" : {
                    "stats" : vsThrow?.strikeOut,
                    "games" : vsThrow?.games,
                    "avg" : vsThrow?.avg,
                    "vsPlayer" : vsThrow?.vsPlayer
                  },
                }
                playerStats.odds.push(props)
              }
              if(element.market ===   "Bateador - Base por bolas (+/-)"){
                const props = {
                  "rival" : element.rival,
                  "market" : "Walks",
                  "line" : element.line,
                  "over" : element.overOdd,
                  "under" : element.underOdd,
                  "cover" : this.setCover(games.game1.baseXBola,
                    games.game2.baseXBola2,
                    games.game3.baseXBola3,
                    games.game4.baseXBola4,
                    games.game5.baseXBola5, element.line),
                  "games" : {
                    "game1" : games.game1?.baseXBola,
                    "game2" : games.game2.baseXBola2,
                    "game3" : games.game3.baseXBola3,
                    "game4" : games.game4.baseXBola4,
                    "game5" : games.game5.baseXBola5
                  },
                  "gamesvsPitcher" : {
                    "stats" : vsPitcher?.baseXBola,
                    "games" : vsPitcher?.games,
                    "avg" : vsPitcher?.avg,
                    "vsPlayer" : vsPitcher?.vsPlayer
                  },

                  "gamesvsThrow" : {
                    "stats" : vsThrow?.baseXBola,
                    "games" : vsThrow?.games,
                    "avg" : vsThrow?.avg,
                    "vsPlayer" : vsThrow?.vsPlayer
                  },
                }
                playerStats.odds.push(props)
              }

            });
          }
          this.playersToView.push(playerStats)
        });
      }
      console.log(this.playersToView)
    }
  }
  setCover(g1: any,g2: any,g3: any,g4: any,g5: any, line: any){
      let i = 0
        if(g1 > line){
          i++
        }
        if(g2 > line){
          i++
        }
        if(g3 > line){
          i++
        }
        if(g4 > line){
          i++
        }
        if(g5 > line){
          i++
        }
        return i
  }
  toNumber(value:string){
    if(value !== ""){
      return parseInt(value,10)
    }
    return 0
  }
  setLogo(data: any){
    data.forEach( (element : any) => {
      element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/"+element.homeName+".png"
      element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/"+element.awayName+".png"
      console.log(element)
    });
    return data
  }
  logo(name: string){
    let ruta = ""
    switch (name){
      case "Rockies":
        ruta = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Rockies.png"
        break;
      }
      return ruta
  }

  /**
   * 
      if(element.awayName === "Rockies"){
        element.awayLogo = ""
      }
      if(element.awayName === "Rays"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Rays.png"
      }
      if(element.awayName === "Orioles"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Orioles.png"
      }
      if(element.awayName === "Blue Jays"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Blue_Jays.png"
      }
      if(element.awayName === "Red Sox"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Red%20Sox.png"
      }
      if(element.awayName === "Rangers"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Rangers.png"
      }
      if(element.awayName === "Pirates"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Pirates.png"
      }
      if(element.awayName === "Marlins"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Marlins.png"
      }
      if(element.awayName === "Mets"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Mets.png"
      }
      if(element.awayName === "Astros"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Astros.png"
      }
      if(element.awayName === "Braves"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Braves.png"
      }
      if(element.awayName === "Padres"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Padres.png"
      }
      if(element.awayName === "Cubs"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Cubs.png"
      }
      if(element.awayName === "Diamondbacks"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Diamondbacks.png"
      }
      if(element.awayName === "Athletics"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Athletics.png"
      }
      if(element.awayName === "Mariners" ){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Mariners.png"
      }
      if(element.awayName === "Tigers"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Tigers.png"
      }
      if(element.awayName === "Dodgers"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Dodgers.png"
      }
      if(element.homeName === "Dodgers"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Dodgers.png"
      }
      if(element.homeName === "Rockies"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Rockies.png"
      }
      if(element.homeName === "Rays"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Rays.png"
      }
      if(element.homeName === "Orioles"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Orioles.png"
      }
      if(element.homeName === "Blue Jays"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Blue_Jays.png"
      }
      if(element.homeName === "Red Sox"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Red%20Sox.png"
      }
      if(element.homeName === "Rangers"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Rangers.png"
      }
      if(element.homeName === "Pirates"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Pirates.png"
      }
      if(element.homeName === "Marlins"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Marlins.png"
      }
      if(element.homeName === "Mets"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Mets.png"
      }
      if(element.homeName === "Astros"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Astros.png"
      }
      if(element.homeName === "Braves"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Braves.png"
      }
      if(element.homeName === "Padres"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Padres.png"
      }
      if(element.homeName === "Cubs"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/Cubs.png"
      }
      if(element.homeName === "Diamondbacks"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Diamondbacks.png"
      }
      if(element.homeName === "Athletics"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Athletics.png"
      }
      if(element.homeName === "Mariners"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Mariners.png"
      }
      if(element.homeName === "Tigers"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Tigers.png"
      }
      if(element.awayName === "Dodgers"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Dodgers.png"
      }
      if(element.awayName === "Phillies"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Phillies.png"
      }
      if(element.homeName === "Phillies"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Phillies.png"
      }
      if(element.homeName === "Reds"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Reds.png"
      }
      if(element.homeName === "Royals"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Royals.png"
      }
      if(element.homeName === "Brewers"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Brewers.png"
      }
      if(element.homeName === "Angels"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Angels.png"
      }
      if(element.homeName === "Cardinals"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Cardinals.png"
      }
      if(element.homeName === "Twins"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Twins.png"
      }
      if(element.awayName === "Reds"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Reds.png"
      }
      if(element.awayName === "Royals"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Royals.png"
      }
      if(element.awayName === "Brewers"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Brewers.png"
      }
      if(element.awayName === "Angels"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Angels.png"
      }
      if(element.awayName === "Cardinals"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Cardinals.png"
      }
      if(element.awayName === "Twins"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Twins.png"
      }
      if(element.awayName === "White Sox"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/White_Sox.png"
      }
      if(element.homeName === "White Sox"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/White_Sox.png"
      }
      if(element.awayName === "Giants"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Giants.png"
      }
      if(element.homeName === "Giants"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Giants.png"
      }
      if(element.awayName === "Guardians"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Guardians.png"
      }
      if(element.homeName === "Guardians"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Guardians.png"
      }
      if(element.awayName === "Yankees"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Yankees.png"
      }
      if(element.homeName === "Yankees"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Yankees.png"
      }
      if(element.awayName === "Nationals"){
        element.awayLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Nationals.png"
      }
      if(element.homeName === "Nationals"){
        element.homeLogo = "https://lexfitcode.github.io/dummieweb/Logos%20mlb/Nationals.png"
      }
   * / */
}
