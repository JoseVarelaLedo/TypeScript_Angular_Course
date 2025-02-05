import { Component } from '@angular/core';

interface House {
  title: string;
  description: string;
  lngLat: [number, number];
}


@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent {

  public houses: House[] = [
    {
      title: 'Ozone Gym, Santiago',
      description: 'Gimnasio en Avenida de Barcelona, 25',
      lngLat: [ -8.56097037481527, 42.87077437978567 ]
    },
    {
      title: 'Casa en Lalín',
      description: 'Casa en Avenida de Cruces 41, Lalín',
      lngLat: [ -8.119024179860617, 42.66821847916944 ]
    },
    {
      title: 'Iglesia San Román',
      description: 'Igrexa de San Román en Val do Dubra',
      lngLat: [ -8.66131166426004, 42.97391594111687 ]
    },
    {
      title: 'NewBit Compostela',
      description: 'Tienda de Informática en Rosalía de Castro, Santiago de Compostela.',
      lngLat: [ -8.551972659357034, 42.874515170287765 ]
    },
  ]
}
