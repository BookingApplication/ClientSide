import {AfterViewInit, Component, Input} from '@angular/core';
import * as L from 'leaflet';
import {MapService} from "./map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;

  @Input()
  location:string;

  constructor(private mapService: MapService) {}

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.search(this.location)
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      new L.Marker([lat, lng]).addTo(this.map);
    });
  }

  search(location:string): void {
    this.mapService.search(location).subscribe({
      next: (result) => {
        console.log(result);  //ovaj rezultat moze biti niz adresa, ako nismo odredili grad
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup(location)
          .openPopup();
      },
      error: () => {},
    });
  }

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });
    this.initMap();
  }
}
