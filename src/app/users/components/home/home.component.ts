import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../vehicle';

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
  vehicleDetails;
  constructor(private vehcileService:VehicleService, private router:Router) { 
    
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
        this.map.addControl(new mapboxgl.NavigationControl({showZoom:true}));
        new mapboxgl.Marker({color:'#000000'}).setLngLat([this.lng, this.lat]).addTo(this.map).setPopup(new mapboxgl.Popup().setHTML("<h6>You are here!</h6>"));
      },error => console.log(error),{enableHighAccuracy: true,timeout: 5000,
        maximumAge: 0
      });
      
      
        

    }
    this.getVehicleDetails();
    setInterval(()=>{
      this.getVehicleDetails()
    },300000)
  }
  name:string
  
  getVehicleDetails(){
    console.log("refresh")
    
    this.vehcileService.getVehicleDetails()
    .subscribe(res =>{
      res.forEach(element =>{
        if(element.availability === "free"){
        var el = document.createElement('img');
        el.setAttribute('src','../../../../assets/marker.png')
        el.setAttribute('width',"60px")
        el.addEventListener('click',()=>{
          this.vehicleDetails = element;
          this.showLogin();
        })
        var marker = new mapboxgl.Marker(el)
        .setLngLat([element.positionLng, element.positionLat])
        .addTo(this.map)
        .setPopup(new mapboxgl.Popup()
        );
        
        setTimeout(()=>{
          marker.remove();
        },300000)
        }
      })
    },
    err =>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          sessionStorage.clear();
          this.router.navigate([''])
        }
      }
    }
    )
  }

  

 


  refresh(){
    window.location.reload();
  }


  public showModal: boolean;

  showLogin() {
    this.showModal = true;
    // console.log(this.vehicleDetails)
  }

  hide() {

    this.showModal = false;
  }


}
