import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  private debounceTimer?: NodeJS.Timeout;

  constructor( private placesService: PlacesService ) {}

  onQueryChanged (query: string = ''): void {
    if ( this.debounceTimer ) clearTimeout (this.debounceTimer); //se limpia el temporizador si se está escribiendo
    this.debounceTimer = setTimeout (()=> { //al dejar de escribir, tras 1/2 segundo, se emite la consulta
      this.placesService.getPlacesByQuery(query);
    }, 500
    );
  }
}
