import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http:HttpClient) { }

  private _urlday1 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/031825.json'
  private _urlday2 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/031925.json'
  private _urlday3 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/032725.json'
  private _urlday4 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/032825.json'
  private _urlday5 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/032925.json'
  private _urlday6 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/033025.json'
  private _urlday7 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/033125.json'
  private _urlday8 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/040125.json'
  private _urlday9 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/040225.json'
  private _urlday10 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/040325.json'
  private _urlday11 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/040425.json'
  private _urlday12 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/040525.json'
  private _urlday13 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/040625.json'
  private _urlday14 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/040725.json'
  private _urlday15 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/040825.json'
  private _urlday16 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/040925.json'
  private _urlday17 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/041925.json'
  private _urlday18 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/041125.json'
  private _urlday19 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/041225.json'
  private _urlday20 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/041325.json'
  private _urlday21 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/041425.json'
  private _urlday22 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/041525.json'
  private _urlday23 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/041625.json'
  private _urlday24 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/041725.json'
  private _urlday25 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/041825.json'
  private _urlday26 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/041925.json'
  private _urlday27 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/042025.json'
  private _urlday28 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/042125.json'
  private _urlday29 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/042225.json'
  private _urlday30 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/042325.json'
  private _urlday31 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/042425.json'
  private _urlday32 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/042525.json'
  private _urlday33 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/042625.json'
  private _urlday34 = 'https://lexfitcode.github.io/dummieweb/lm/dayGames/042725.json'


    getStatsDay1(): Observable<any> {
      return this.http.get<any>(this._urlday1)
    }
    getStatsDay2(): Observable<any> {
      return this.http.get<any>(this._urlday2)
    }
    getStatsDay3(): Observable<any> {
      return this.http.get<any>(this._urlday3)
    }
    getStatsDay4(): Observable<any> {
      return this.http.get<any>(this._urlday4)
    }
    getStatsDay5(): Observable<any> {
      return this.http.get<any>(this._urlday5)
    }
    getStatsDay6(): Observable<any> {
      return this.http.get<any>(this._urlday6)
    }
    getStatsDay7(): Observable<any> {
      return this.http.get<any>(this._urlday7)
    }
    getStatsDay8(): Observable<any> {
      return this.http.get<any>(this._urlday8)
    }
    getStatsDay9(): Observable<any> {
      return this.http.get<any>(this._urlday9)
    }
    getStatsDay10(): Observable<any> {
      return this.http.get<any>(this._urlday10)
    }
    getStatsDay11(): Observable<any> {
      return this.http.get<any>(this._urlday11)
    }
    getStatsDay12(): Observable<any> {
      return this.http.get<any>(this._urlday12)
    }
    getStatsDay13(): Observable<any> {
      return this.http.get<any>(this._urlday13)
    }
    getStatsDay14(): Observable<any> {
      return this.http.get<any>(this._urlday14)
    }
    getStatsDay15(): Observable<any> {
      return this.http.get<any>(this._urlday15)
    }
    getStatsDay16(): Observable<any> {
      return this.http.get<any>(this._urlday16)
    }
    getStatsDay17(): Observable<any> {
      return this.http.get<any>(this._urlday17)
    }
    getStatsDay18(): Observable<any> {
      return this.http.get<any>(this._urlday18)
    }
    getStatsDay19(): Observable<any> {
      return this.http.get<any>(this._urlday19)
    }
    getStatsDay20(): Observable<any> {
      return this.http.get<any>(this._urlday20)
    }
    getStatsDay21(): Observable<any> {
      return this.http.get<any>(this._urlday21)
    }
    getStatsDay22(): Observable<any> {
      return this.http.get<any>(this._urlday22)
    }
    getStatsDay23(): Observable<any> {
      return this.http.get<any>(this._urlday23)
    }
    getStatsDay24(): Observable<any> {
      return this.http.get<any>(this._urlday24)
    }
    getStatsDay25(): Observable<any> {
      return this.http.get<any>(this._urlday25)
    }
    getStatsDay26(): Observable<any> {
      return this.http.get<any>(this._urlday26)
    }
    getStatsDay27(): Observable<any> {
      return this.http.get<any>(this._urlday27)
    }
    getStatsDay28(): Observable<any> {
      return this.http.get<any>(this._urlday28)
    }
    getStatsDay29(): Observable<any> {
      return this.http.get<any>(this._urlday29)
    }
    getStatsDay30(): Observable<any> {
      return this.http.get<any>(this._urlday30)
    }
    getStatsDay31(): Observable<any> {
      return this.http.get<any>(this._urlday31)
    }
    getStatsDay32(): Observable<any> {
      return this.http.get<any>(this._urlday32)
    }
    getStatsDay33(): Observable<any> {
      return this.http.get<any>(this._urlday33)
    }
    getStatsDay34(): Observable<any> {
      return this.http.get<any>(this._urlday34)
    }

}
