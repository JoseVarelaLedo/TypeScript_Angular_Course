import { Component } from '@angular/core';
import { MapService } from '../../services';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-my-location',
  standalone: false,
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {
  constructor( private readonly placesService: PlacesService, private readonly mapService: MapService){}
  goToMyLocation(){
    if (!this.placesService.isUserLocationReady) throw Error ('No user location');
    if (!this.mapService.isMapReady) throw Error ('No map available');
    this.mapService.flyTo(this.placesService.userLocation!);
  }
}
