import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-screen',
  standalone: false,
  templateUrl: './map-screen.component.html',
  styleUrl: './map-screen.component.css'
})
export class MapScreenComponent{
  constructor(private readonly placesService: PlacesService) {}

  get isUserLocationReady(){
    return this.placesService.isUserLocationReady;
  }



}
