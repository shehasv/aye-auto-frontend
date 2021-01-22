import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private _http:HttpClient) { }

  url = "https://aye-auto-shehas.herokuapp.com/vehicle"

  positionUrl = "https://aye-auto-shehas.herokuapp.com/vehicle"

  getVehicleDetails(){
    return this._http.get<Vehicle[]>(this.url)
  }

  updatePosition(id,lat,lng){
    return this._http.patch(this.positionUrl+"?id="+id+"&lat="+lat+"&lng="+lng,id)
  }

  updateStatus(id,status){
    return this._http.patch('https://aye-auto-shehas.herokuapp.com/vehiclestatus?id='+id+'&status='+status,id)
  }


}
