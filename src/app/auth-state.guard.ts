import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {LoginService} from './users/services/login.service'


@Injectable({
  providedIn: 'root'
})
export class AuthStateGuard implements CanActivate {
  
  constructor(private loginService:LoginService,
    private router:Router) {}

  canActivate():boolean{
    if(!this.loginService.loggedIn()){
      return true
    }
    else{
      if(!!sessionStorage.getItem('vehicleId')){
        this.router.navigate(['/vehicle'])
      }
      else{
        this.router.navigate(['/home'])
      }
      return false  
    }
  }
  
}
