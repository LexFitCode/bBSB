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
    })
  }
  setIconsApiGames(){
    this.HittersService.getGames().subscribe((data)=>{
      this.games = this.setLogo(data)
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
  setPlayers(data: any, market: string, vs: string){
    console.log(data)
    let playerProps : any = []
    data.forEach((element: any)=>{
      if(market === "strikeOuts" && vs === "vsPitcher"){
        const props =  {
          "name" : element.name,
          "atbat": element.vsPitcher.atBat,
          "games": element.vsPitcher.games,
          "stats" :this.toNumber(element.vsPitcher.strikeOut),
        }
        playerProps.push(props)
      }
      if(market === "strikeOuts" && vs === "vsThrow"){
        const props =  {
          "name" : element.name,
          "atbat": element.vsPitcherThrow.atBat,
          "games": element.vsPitcherThrow.games,
          "stats" :this.toNumber(element.vsPitcherThrow.strikeOut),
        }
        playerProps.push(props)
      }
      if(market === "walks" && vs === "vsPitcher"){
        const props =  {
          "name" : element.name,
          "atbat": element.vsPitcher.atBat,
          "games": element.vsPitcher.games,
          "stats" :this.toNumber(element.vsPitcher.baseXBola),
        }
          playerProps.push(props)
      }
      if(market === "walks" && vs === "vsThrow"){
        const props =  {
          "name" : element.name,
          "atbat": element.vsPitcherThrow.atBat,
          "games": element.vsPitcherThrow.games,
          "stats" :this.toNumber(element.vsPitcherThrow.baseXBola),
        }
          playerProps.push(props)
      }
      if(market === "hitsAllowed" && vs === "vsPitcher"){
        const props =  {
          "name" : element.name,
          "atbat": element.vsPitcher.atBat,
          "games": element.vsPitcher.games,
          "stats" :this.toNumber(element.vsPitcher.Hits),
        }
        playerProps.push(props)
      }
      if(market === "hitsAllowed" && vs === "vsThrow"){
        const props =  {
          "name" : element.name,
          "atbat": element.vsPitcherThrow.atBat,
          "games": element.vsPitcherThrow.games,
          "stats" :this.toNumber(element.vsPitcherThrow.Hits),
        }
        playerProps.push(props)
      }
    })
    return playerProps
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
          if(odds !== null){
            const players = element2.players
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
                  "playersVsPitcher" : this.setPlayers(players, "strikeOuts","vsPitcher"),
                  "playersVsThrow" : this.setPlayers(players, "strikeOuts","vsThrow"),
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
                  "playersVsPitcher" : this.setPlayers(players, "walks","vsPitcher"),
                  "playersVsThrow" : this.setPlayers(players, "walks","vsThrow"),
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
                  "playersVsPitcher" : this.setPlayers(players, "hitsAllowed","vsPitcher"),
                  "playersVsThrow" : this.setPlayers(players, "hitsAllowed","vsThrow"),
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
        console.log(this.playersToView)
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
    if(value !== "" && value !== undefined && value !== null){
      return parseInt(value,10)
    }
    return 0
  }
  setLogo(data: any){
    data.forEach( (element : any) => {
      element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/"+element.homeName+".png"
      element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/"+element.awayName+".png"
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
}
