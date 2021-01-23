import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {LoginService} from './users/services/login.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private loginService:LoginService,
              private router:Router) {}
  
  canActivate():boolean{
    if(this.loginService.loggedIn()){
      return true
    }
    else{
      this.router.navigate([''])
      return false
    }
  }
  
}
