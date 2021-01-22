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
  place:string;
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
        fetch("https://us1.locationiq.com/v1/reverse.php?key=pk.31dd831e4ece2354f094c88dc5f56d3e&lat=" + 
        this.lat + "&lon=" + this.lng + "&format=json")
      .then(response => response.json())
      .then(data => {
        this.place = data.display_name.split(',')[0];
      })
      
        // Add map controls
        this.map.addControl(new mapboxgl.NavigationControl());
        new mapboxgl.Marker({color:'#000000'}).setLngLat([this.lng, this.lat]).addTo(this.map).setPopup(new mapboxgl.Popup().setHTML("<h6>You are here!</h6>"));
      },error => console.log(error),{enableHighAccuracy: true,timeout: 5000,
        maximumAge: 0
      });
      
      
        

    }
      
    
  }
}
