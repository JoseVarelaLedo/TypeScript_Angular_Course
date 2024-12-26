import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public countries: Country [] = [];
  public initialValue: string = '';
  public isLoading: boolean = false;

    constructor (private readonly countriesService: CountriesService) {}

    ngOnInit(): void {
      this.countries = this.countriesService.cacheStore.byCountries.countries;
      this.initialValue = this.countriesService.cacheStore.byCountries.term;
    }

    searchCountry( country: string): void{
      this.isLoading = true;
     this.countriesService.searchCountry(country)
      .subscribe( countriesReceived => {
        this.countries = countriesReceived;
        this.isLoading = false;
      });
    }
}
