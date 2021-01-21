import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http:HttpClient) { }

  _url = "https://aye-auto-shehas.herokuapp.com/login"

  login(data){
    return this._http.post<{msg:string,id:string}>(this._url,data)
  }

}
