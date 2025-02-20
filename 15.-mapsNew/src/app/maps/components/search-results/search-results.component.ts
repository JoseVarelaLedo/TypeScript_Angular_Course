import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  public selectedId: string = '';

  constructor ( private readonly placesService: PlacesService, private readonly mapService: MapService){}

  get isLoadingPlaces (): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo ( place: Feature): void {
    this.selectedId = place.id;
    const [ lng, lat ] = place.center;
    this.mapService.flyTo ([lng, lat]);
  }

  getAddresses( place: Feature) {
    if (!this.placesService.userLocation) throw Error ('No user location available');

    //una vez se ha pulsado el botón para buscar ruta ocultamos la barra llamando al método
    this.placesService.deletePlaces();
    const start = this.placesService.userLocation;
    const end = place.center as [number, number];
    this.mapService.getRouteBetweenPoints (start, end);
  }
}
