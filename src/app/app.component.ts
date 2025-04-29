import { Component, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HittersService } from './services/hitters.service';
import { GamesComponent } from './components/games/games.component';
import { OddsComponent } from './components/odds/odds.component';
import { HitterHitComponent } from './components/hitter-hit/hitter-hit.component';
import {NgClass} from '@angular/common';
import { GamesService } from './services/games.service';

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
  constructor(private HittersService: HittersService,
    private GamesService: GamesService
  ) { }
  ngOnInit(): void {
    this.setIconsApiHitters()
    this.setIconsApiPitchers()
    this.setIconsApiVersus()
    this.setIconsApiGames()
    this.getDataGames()
    //this.playersIcons = Object.values(icons) //offline
  }
  playersHitters: any= []
  playersPitchers: any= []
  playersVersus: any= []
  gameDay1: any = []
  gameDay2: any = []
  gameDay3: any = []
  gameDay4: any = []
  gameDay5: any = []
  gameDay6: any = []
  gameDay7: any = []
  gameDay8: any = []
  gameDay9: any = []
  gameDay10: any = []
  gameDay11: any = []
  gameDay12: any = []
  gameDay13: any = []
  gameDay14: any = []
  gameDay15: any = []
  gameDay16: any = []
  gameDay17: any = []
  gameDay18: any = []
  gameDay19: any = []
  gameDay20: any = []
  gameDay21: any = []
  gameDay22: any = []
  gameDay23: any = []
  gameDay24: any = []
  gameDay25: any = []
  gameDay26: any = []
  gameDay27: any = []
  gameDay28: any = []
  gameDay29: any = []
  gameDay30: any = []
  gameDay31: any = []
  gameDay32: any = []
  gameDay33: any = []
  gameDay34: any = []
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
      return this.playersToView
    }
  }

  setViewTeam(away: string, home: string){
    const homeData = this.getTeamInfo(home, "home")
    const awayData = this.getTeamInfo(away, "away")
    console.log(homeData)
    console.log(awayData)    
  }
  getTeamInfo(team: string, status: string){
    let new_game: any = {}
    const home_games_home : any = []
    const away_games_away: any  = []
    const home_games_total: any = []
    const away_games_total: any = []
    this.gameDay1.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay2.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay3.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay4.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay5.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay6.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay7.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay8.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay9.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay10.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay11.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay12.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay13.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay14.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay15.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay16.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay17.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay18.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay19.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay20.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay21.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay22.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay23.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay24.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay25.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay26.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay27.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay28.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay29.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay30.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay31.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay32.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay32.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay33.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    this.gameDay34.forEach((element2 : any)=>{
      if(status==="away"){
        if (element2.away_team === team){
            away_games_away.push(element2)}
        if (element2.away_team === team || element2.home_team === team){
            away_games_total.push(element2)}
      }
      if(status === "home"){
        if (element2.home_team === team){
            home_games_home.push(element2)}
        if (element2.home_team === team || element2.away_team === team){
            home_games_total.push(element2)}
      }
    })
    if(status === "home"){
      new_game.home_games_home = home_games_home
      new_game.home_games_total = home_games_total
    }
    if(status === "away"){
      new_game.away_games_away = away_games_away
      new_game.away_games_total = away_games_total
    }
    return new_game
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
    console.log(data)
    data.forEach( (element : any) => {
      element.homeLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/"+element.game.home.name+".png"
      element.awayLogo = "https://lexfitcode.github.io/dummieweb/logos%20mlb/"+element.game.away.name+".png"
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

  setGameDay1(){
    this.GamesService.getStatsDay1().subscribe((data)=>{
      this.gameDay1 = data
    })
  }
  setGameDay2(){
    this.GamesService.getStatsDay2().subscribe((data)=>{
      this.gameDay2 = data
    })
  }
  setGameDay3(){
    this.GamesService.getStatsDay3().subscribe((data)=>{
      this.gameDay3 = data
    })
  }
  setGameDay4(){
    this.GamesService.getStatsDay4().subscribe((data)=>{
      this.gameDay4 = data
    })
  }
  setGameDay5(){
    this.GamesService.getStatsDay5().subscribe((data)=>{
      this.gameDay5 = data
    })
  }
  setGameDay6(){
    this.GamesService.getStatsDay6().subscribe((data)=>{
      this.gameDay6 = data
    })
  }
  setGameDay7(){
    this.GamesService.getStatsDay7().subscribe((data)=>{
      this.gameDay7 = data
    })
  }
  setGameDay8(){
    this.GamesService.getStatsDay8().subscribe((data)=>{
      this.gameDay8 = data
    })
  }
  setGameDay9(){
    this.GamesService.getStatsDay9().subscribe((data)=>{
      this.gameDay9 = data
    })
  }
  setGameDay10(){
    this.GamesService.getStatsDay10().subscribe((data)=>{
      this.gameDay10 = data
    })
  }
  setGameDay11(){
    this.GamesService.getStatsDay11().subscribe((data)=>{
      this.gameDay11 = data
    })
  }
  setGameDay12(){
    this.GamesService.getStatsDay12().subscribe((data)=>{
      this.gameDay12 = data
    })
  }
  setGameDay13(){
    this.GamesService.getStatsDay13().subscribe((data)=>{
      this.gameDay13= data
    })
  }
  setGameDay14(){
    this.GamesService.getStatsDay14().subscribe((data)=>{
      this.gameDay14 = data
    })
  }
  setGameDay15(){
    this.GamesService.getStatsDay15().subscribe((data)=>{
      this.gameDay15 = data
    })
  }
  setGameDay16(){
    this.GamesService.getStatsDay16().subscribe((data)=>{
      this.gameDay16 = data
    })
  }
  setGameDay17(){
    this.GamesService.getStatsDay17().subscribe((data)=>{
      this.gameDay17 = data
    })
  }
  setGameDay18(){
    this.GamesService.getStatsDay18().subscribe((data)=>{
      this.gameDay18 = data
    })
  }  
  setGameDay19(){
    this.GamesService.getStatsDay19().subscribe((data)=>{
      this.gameDay19 = data
    })
  }
  setGameDay20(){
    this.GamesService.getStatsDay20().subscribe((data)=>{
      this.gameDay20 = data
    })
  }
  setGameDay21(){
    this.GamesService.getStatsDay21().subscribe((data)=>{
      this.gameDay21 = data
    })
  }
  setGameDay22(){
    this.GamesService.getStatsDay22().subscribe((data)=>{
      this.gameDay22 = data
    })
  }
  setGameDay23(){
    this.GamesService.getStatsDay23().subscribe((data)=>{
      this.gameDay23 = data
    })
  }
  setGameDay24(){
    this.GamesService.getStatsDay24().subscribe((data)=>{
      this.gameDay24 = data
    })
  }
  setGameDay25(){
    this.GamesService.getStatsDay25().subscribe((data)=>{
      this.gameDay25 = data
    })
  }
  setGameDay26(){
    this.GamesService.getStatsDay26().subscribe((data)=>{
      this.gameDay26 = data
    })
  }
  setGameDay27(){
    this.GamesService.getStatsDay27().subscribe((data)=>{
      this.gameDay27 = data
    })
  }
  setGameDay28(){
    this.GamesService.getStatsDay28().subscribe((data)=>{
      this.gameDay28 = data
    })
  }
  setGameDay29(){
    this.GamesService.getStatsDay29().subscribe((data)=>{
      this.gameDay29 = data
    })
  }
  setGameDay30(){
    this.GamesService.getStatsDay30().subscribe((data)=>{
      this.gameDay30 = data
    })
  }
  setGameDay31(){
    this.GamesService.getStatsDay31().subscribe((data)=>{
      this.gameDay31 = data
    })
  }
  setGameDay32(){
    this.GamesService.getStatsDay32().subscribe((data)=>{
      this.gameDay32 = data
    })
  }
  setGameDay33(){
    this.GamesService.getStatsDay33().subscribe((data)=>{
      this.gameDay33 = data
    })
  }
  setGameDay34(){
    this.GamesService.getStatsDay34().subscribe((data)=>{
      this.gameDay34 = data
      console.log(data)
    })
  }

  getDataGames(){
    this.setGameDay1()
    this.setGameDay2()
    this.setGameDay3()
    this.setGameDay1()
    this.setGameDay4()
    this.setGameDay5()
    this.setGameDay6()
    this.setGameDay7()
    this.setGameDay8()
    this.setGameDay9()
    this.setGameDay10()
    this.setGameDay11()
    this.setGameDay12()
    this.setGameDay13()
    this.setGameDay14()
    this.setGameDay15()
    this.setGameDay16()
    this.setGameDay17()
    this.setGameDay18()
    this.setGameDay19()
    this.setGameDay20()
    this.setGameDay21()
    this.setGameDay22()
    this.setGameDay23()
    this.setGameDay24()
    this.setGameDay25()
    this.setGameDay26()
    this.setGameDay27()
    this.setGameDay28()
    this.setGameDay29()
    this.setGameDay30()
    this.setGameDay31()
    this.setGameDay32()
    this.setGameDay33()
    this.setGameDay34()
  }
}
