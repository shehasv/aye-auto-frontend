import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private _http:HttpClient) { }

  url = "https://aye-auto-shehas.herokuapp.com/vehicle"

  getVehicleDetails(){
    return this._http.get<Vehicle[]>(this.url)
  }

}
