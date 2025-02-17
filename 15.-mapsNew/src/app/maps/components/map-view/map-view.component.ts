import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import {Map, Popup, Marker} from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  standalone: false,
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit{
  @ViewChild ('mapDiv') //así recibimos la referencia #mapDiv creada en el html
  mapDivElement!: ElementRef

  constructor (
      private readonly placesService: PlacesService,
      private readonly mapService: MapService
    ) {}

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw Error ('PlacesServices no es capaz de acceder a la geolocalización');
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat] -- nuestras coordenadas
      zoom: 14, // starting zoom
    });

    const popup = new Popup()
      .setHTML(
        `
        <h6>I´m Here</h6>
        <span>I am in this place of the world</span>
        `
      );

      new Marker ({color: 'red'})
        .setLngLat(this.placesService.userLocation)
        .setPopup(popup)
        .addTo(map);

      this.mapService.setMap (map);
  }
}
