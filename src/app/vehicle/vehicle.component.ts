import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../environments/environment';
import { VehicleService } from '../users/services/vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  public lat;
  public lng;
  place:string;
  public selectedVal: string;
  constructor(private vehcileService:VehicleService) { 
    
  }

  public onValChange(val: string) {
    this.selectedVal = val;
    this.chnageStatus();
  }


  chnageStatus(){
    this.vehcileService.updateStatus(sessionStorage.getItem('id'),this.selectedVal)
    .subscribe((res)=>{
      console.log(res)
    })
  }
  
  ngOnInit() {
    this.selectedVal ='free';
    this.chnageStatus();
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
        this.map.addControl(new mapboxgl.NavigationControl({showZoom:true}));
        var el = document.createElement('img');
        el.setAttribute('src','../../../../assets/marker.png')
        el.setAttribute('width',"60px")
        new mapboxgl.Marker(el).setLngLat([this.lng, this.lat]).addTo(this.map).setPopup(new mapboxgl.Popup().setHTML("<h6>You are here!</h6>"));
      },error => console.log(error),{enableHighAccuracy: true,timeout: 5000,
        maximumAge: 0
      });

    }

    setInterval(()=>{
      console.log('retry')
      this.updatePosition()
    },300000)

  }

  updatePosition(){
    window.location.reload();
  }

  ngOnDestroy() {
    console.log('close')
    this.vehcileService.updateStatus(sessionStorage.getItem('id'),'not-available')
    .subscribe((res)=>{
      console.log(res)
    })
  }
  

}