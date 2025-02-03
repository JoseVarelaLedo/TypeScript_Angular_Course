import { Injectable } from '@angular/core';
import { Country, Region, SmallCountry } from '../interfaces/country.interfaces';
import { combineLatest, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly baseUrl: string = 'https://restcountries.com/v3.1';

  private readonly _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];
  constructor(private http: HttpClient) { }

  get regions(): Region[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]); //si no recibimos región devolvemos un Observable de un array vacío
    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.map(country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? [] //puede haber o no borders
        })))
      );
  }

  getCountryByAlphaCode(alphaCode: string): Observable<SmallCountry> {
    const url = `${ this.baseUrl }/alpha/${ alphaCode }?fields=cca3,name,borders`;
    return this.http.get<Country>(url)
    .pipe(
      map(country =>  ({
        name: country.name.common,
        cca3: country.cca3,
        borders: country.borders ?? [] //puede haber o no borders
      }))
    );
  }

  getCountryBordersByCodes ( borders: string[] ): Observable<SmallCountry[]> {
    if (!borders || borders.length === 0) return of ([]);

    const countriesRequest: Observable<SmallCountry> [] = [];

    borders.forEach ( code => {
      const request = this.getCountryByAlphaCode ( code );
      countriesRequest.push ( request );
    });

    return combineLatest ( countriesRequest );
  }
}
