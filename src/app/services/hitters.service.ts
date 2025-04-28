import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HittersService {
  
  private _url = 'https://lexfitcode.github.io/dummieweb/lm/hitters.json'
  private _url2 = 'https://lexfitcode.github.io/dummieweb/lm/pitchers.json'
  private _url3 = 'https://lexfitcode.github.io/dummieweb/lm/versus.json'
  private _url4 = 'https://lexfitcode.github.io/dummieweb/lm/games.json'
  private _url5 = 'https://lexfitcode.github.io/dummieweb/lm/todayGames/gamesComplete.json'
  constructor( private http:HttpClient ) { }

  getHitters(): Observable<any> {
    return this.http.get<any>(this._url)
  }
  getPitchers(): Observable<any> {
    return this.http.get<any>(this._url2)
  }
  getVersus(): Observable<any> {
    return this.http.get<any>(this._url3)
  }
  getBoxscore(): Observable<any> {
    return this.http.get<any>(this._url4)
  }
  getGames(): Observable<any> {
    return this.http.get<any>(this._url5)
  }

}
