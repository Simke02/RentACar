import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'

@Injectable({providedIn: 'root'})
export class AutoGuard implements CanActivate{
  constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        const lokacija = sessionStorage.getItem('lokacija');
        const noviZahtev = sessionStorage.getItem('noviZahtev');
        const tip = sessionStorage.getItem('tip');
        const vremeIzdavanja = sessionStorage.getItem('vremeIzdavanja');
        const vremeVracanja = sessionStorage.getItem('vremeVracanja');
        if(lokacija !== null && noviZahtev !== null
            && tip !== null && vremeIzdavanja !== null
            && vremeVracanja !== null)
            return true;
        else
            return this.router.createUrlTree(['']);
    }

}