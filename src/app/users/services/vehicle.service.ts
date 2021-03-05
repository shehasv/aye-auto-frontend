import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../vehicle';
import { interval, Observable, Subject, throwError } from 'rxjs';
import { catchError, map, mapTo, retry, startWith, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private _http:HttpClient) { }

  url = "https://aye-auto-shehas.herokuapp.com/vehicle"

  positionUrl = "https://aye-auto-shehas.herokuapp.com/vehicle"

  getVehicleDetails(){

    return interval(10000) // Setup the interval (emits every 4 seconds)
    .pipe(
      startWith(0),             // Starts immediatly
      mapTo(                    // Map to your request
         this._http.get<Vehicle[]>(this.url)
      ),
      switchMap(v => v),
      map(quote => quote) // Take the field you need
    );


    // return this._http.get<Vehicle[]>(this.url)
  }

  updatePosition(id,lat,lng){
    return this._http.patch(this.positionUrl+"?id="+id+"&lat="+lat+"&lng="+lng,id)
  }

  updateStatus(id,status){
    return this._http.patch('https://aye-auto-shehas.herokuapp.com/vehiclestatus?id='+id+'&status='+status,id)
  }


}
