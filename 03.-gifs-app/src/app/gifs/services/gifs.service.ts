import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif [] = [];

  private _tagsHistory:        string[] = [];
  private readonly apiKey:     string = 'N5EXRagblsZGZ1elbuVVhs5z8SBJU5Zp';
  private readonly serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private readonly http: HttpClient){
    this.loadLocalStorage();
  }

  get tagsHistory():string[]{
    return [...this._tagsHistory];
  }

  private organizeHistory ( tag: string ): void{
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes( tag )) { //devolvemos un nuevo array con los elementos no coincidentes
      this._tagsHistory = this._tagsHistory.filter( (oldTag)=> oldTag !== tag); //filtrados aquí
    }
    this._tagsHistory.unshift(tag); //insertamos como primer elemento la tag
    this._tagsHistory= this._tagsHistory.splice (0, 10); //limitar los elementos a 10
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem ('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem ('history')!); //operador not-null assertion !
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag ( tag: string ): void {
    if ( tag.length === 0 ) return;
    this.organizeHistory ( tag );
    const params = new HttpParams()
      .set ('api_key', this.apiKey)
      .set ('limit', '10')
      .set ('q', tag)
    ;
    this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, { params })
      .subscribe( resp =>{
        this.gifList = resp.data;
      } );
  }
}
