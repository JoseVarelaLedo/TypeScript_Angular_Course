import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken = 'pk.eyJ1IjoiYXJkZGFyeWQiLCJhIjoiY202cWdxZzhqMWZqcDJzcjVsdmkybXMxaCJ9.U9GZOm5qBIwjVQ3eBHkN-g';


if (!navigator.geolocation) {
  alert('The browser does not support geolocation');
  throw new Error ('The browser does not support geolocation');
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
})
  .catch(err => console.error(err));
