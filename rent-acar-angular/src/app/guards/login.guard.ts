import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate{
    helper = new JwtHelperService();
  constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const token = localStorage.getItem('token');
        if(token){
            const dekodiranToken = this.helper.decodeToken(token);
            if(!dekodiranToken.role)
                return true;
            else
                return this.router.createUrlTree(['/login']);
        }
        else
            return this.router.createUrlTree(['/login']);
    }

}