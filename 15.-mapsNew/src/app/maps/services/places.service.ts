import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  public isLoadingPlaces: boolean = false;

  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor( private readonly placesApiClient: PlacesApiClient,
               private readonly mapService: MapService
  ) {
    this.getUserLocation();
   }

  public async getUserLocation(): Promise <[number, number]> {
    return new Promise ( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
                this.userLocation = [coords.longitude, coords.latitude];
                resolve (this.userLocation);
        },
        (error) => {
          alert ('No se pudo obtener la geolocalización');
          //alert (error);
          reject();
        }
      );
    });
  }

  getPlacesByQuery ( query: string = ''): void {
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }
    if (!this.userLocation) throw new Error ('User Location not available');
    this.isLoadingPlaces = true;
    this.placesApiClient.get<PlacesResponse> (`/${ query }.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
     .subscribe( response => {
      //console.log (response.features);
      this.isLoadingPlaces = false;
      this.places = response.features;
      this.mapService.createMarkersFromPlaces(this.places, this.userLocation!);
     } );
  }

  deletePlaces() {
    this.places = [];
  }
}
