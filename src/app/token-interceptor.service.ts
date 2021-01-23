import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import { LoginService } from './users/services/login.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private loginService:LoginService) { }

  intercept(req, next){


    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization: `Bearer ${this.loginService.getToken()}`
      }
    })

    return next.handle(tokenizedReq)

  }
}
