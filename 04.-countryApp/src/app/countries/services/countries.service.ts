import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, Observable, map, delay, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache.store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountries: {
      term: '',
      countries: []
    },
    byRegion: {
      region: '',
      countries: []
    },
  }

  constructor(private readonly http: HttpClient) {
      this.loadFromLocalStorage();
   }

  private saveToLocalStorage() {
    localStorage.setItem ('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem ('cacheStore')) return;
    this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => of([])), //si hay un error devuelve un observable de un array vacío
        //delay (2000), //añadimos un retraso para simular carga
      );;
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        //mapeamos para que devuelva el primer elemento del array o un nulo si no hay ninguno
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(error => of(null)) //si hay un error devuelve un observable de un null
      );
  }

  searchCapital(query: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${query}`;
    return this.http.get<Country[]>(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term: query, countries: countries }),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchCountry(country: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${country}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountries = { term: country, countries: countries }),
        tap( () => this.saveToLocalStorage() )
      );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.http.get<Country[]>(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region: region, countries: countries }),
        tap( () => this.saveToLocalStorage() )
      );
  }
}
