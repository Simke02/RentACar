import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'

@Injectable({providedIn: 'root'})
export class RezOsigGuard implements CanActivate{
  constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const auto = sessionStorage.getItem('auto');
        if(auto !== null)
            return true;
        else
            return this.router.createUrlTree(['']);
    }

}