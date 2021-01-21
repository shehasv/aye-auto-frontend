import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http:HttpClient) { }

  customerurl = "https://aye-auto-shehas.herokuapp.com/login"
  vehicleurl = "https://aye-auto-shehas.herokuapp.com/vehiclelogin"

  login(data){
    return this._http.post<{msg:string,id:string}>(this.customerurl,data)
  }


  vehicleLogin(data){
    return this._http.post<{msg:string,id:string}>(this.vehicleurl,data)
  }

}
