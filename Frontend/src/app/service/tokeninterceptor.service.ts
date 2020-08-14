import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http'
import {ServiceService} from './service.service'
@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor(private service:ServiceService) { }
 intercept(req,next)
 {
   console.log("intecerpt");

   let authService=this.service.gettoken();

   console.log("authserice")
   console.log(authService);
    let tokenizedReq=req.clone({
    //  headers:req.headers.set('Authorization',`Bearer ${authService}`),
    headers:req.headers.set("token",`${authService}`)
    // setHeaders:{
    //   token:`${authService}`
    // }
     })
    return next.handle(tokenizedReq)
  }
}
