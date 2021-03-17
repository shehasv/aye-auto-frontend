import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as turf from '@turf/turf'

@Component({
  selector: 'app-fare-calculation',
  templateUrl: './fare-calculation.component.html',
  styleUrls: ['./fare-calculation.component.scss']
})
export class FareCalculationComponent implements OnInit {

  constructor() { }

  
  style = 'mapbox://styles/mapbox/streets-v11';
  lat;
  lng;
  toLat;
  toLng;
  ngOnInit() {

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        Object.getOwnPropertyDescriptor(mapboxgl, "accessToken").set(environment.mapbox.accessToken);
        let map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 15,
        center: [this.lng, this.lat]
        });    

        var marker = new mapboxgl.Marker({color:'#000000'}) // Initialize a new marker
        .setLngLat([this.lng, this.lat]) // Marker [lng, lat] coordinates
        .addTo(map); // Add the marker to the map


        var geocoder = new MapboxGeocoder({
          // Initialize the geocoder
          accessToken: environment.mapbox.accessToken, // Set the access token
          mapboxgl: mapboxgl, // Set the mapbox-gl instance
          marker: false, // Do not use the default marker style
          placeholder: 'Search for places', // Placeholder text for the search bar
          proximity: {
          longitude: this.lng,
          latitude: this.lat
          } 
          });

          map.addControl(geocoder);

          map.on('load', function () {
            map.addSource('single-point', {
            'type': 'geojson',
            'data': {
            'type': 'FeatureCollection',
            'features': []
            }
            });
             
            map.addLayer({
              'id': 'single-point',
              'type': 'circle',
              "source":'single-point',
              'paint':{
              "circle-color": '#000000'
              }
            });
             
            // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
            //  Add a marker at the result's coordinates
            geocoder.on('result', (e) => {
              
              
              var searchResult = e.result.geometry;
              // console.log(searchResult)
              navigator.geolocation.getCurrentPosition((position)=>{
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                // map.getSource('single-point').setData(e.result.geometry);


                


                fetch("https://api.mapbox.com/directions-matrix/v1/mapbox/driving/"+lng+","+lat+";"+searchResult.coordinates[0]+","+searchResult.coordinates[1]+"?sources=0&destinations=1&annotations=distance,duration&access_token="+environment.mapbox.accessToken)
                .then(response => response.json())
                .then(data => {
                  // console.log(data)
                  if(data.code === "Ok"){
                    let distance = data.distances[0] / 1000;
                    document.getElementById('distance').innerHTML = 'Distance : '+distance + ' Km';
                    document.getElementById('display').style.display = "flex"
                  }
                  else{
                    document.getElementById('error-route').style.display = "block";
                    setTimeout(()=>{
                      document.getElementById('error-route').style.display = "none"; 
                    },5000)
                  }
                })


                // var distance = turf.distance(from, to, {units: 'kilometers'}).toString().split('.')[0];

                

              })
              });
            });

            
            
      })
    }
  }


  calculate(){
    console.log()
  }

}
