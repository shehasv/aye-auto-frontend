import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat;
  lng;
  constructor() { 
    
  }
  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
        this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 15,
        center: [this.lng, this.lat]
        });
        // Add map controls
        this.map.addControl(new mapboxgl.NavigationControl());
        new mapboxgl.Marker({color:'#000000'}).setLngLat([this.lng, this.lat]).addTo(this.map).setPopup(new mapboxgl.Popup().setHTML("<h3>You are here!</h3>"));
      },error => console.log(error),{enableHighAccuracy: true,timeout: 5000,
        maximumAge: 0});
    }
      
    
  }
}
