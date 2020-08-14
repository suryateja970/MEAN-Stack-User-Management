import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {ServiceService} from '../service/service.service'
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private service:ServiceService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot): boolean{
    if(this.service.isAuthenticated())
    {
      console.log("can acitvate")
      return true
    }
    else{
      this.router.navigate(['/'])
      return false
    }

  }
  
}
