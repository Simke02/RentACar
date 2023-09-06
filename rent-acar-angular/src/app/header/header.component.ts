import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  ulogovanSub: Subscription;
  ulogovan: boolean = false;
  helper = new JwtHelperService();

  constructor(private loginService: LoginService) {
    this.ulogovanSub = this.loginService.ulogovan.subscribe({
      next: (ulg)=>{
        this.ulogovan = ulg;
      }
    })
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      const dekodiranToken = this.helper.decodeToken(token);
      const expirationDuration = (new Date(dekodiranToken.exp).getTime())*1000 - new Date().getTime();
      if(dekodiranToken.role==true){
        localStorage.setItem('adminMode', String(true));
      }
      else{
        localStorage.setItem('adminMode', String(false));
      }
      this.loginService.ulogovan.next(true);
      console.log(expirationDuration);
      this.loginService.autoLogout(expirationDuration);
    }else{
      localStorage.setItem('adminMode', String(false));
      this.loginService.ulogovan.next(false);
    }
  }

  ngOnDestroy() {
    localStorage.removeItem('adminMode');
  }

  logout(){
    this.loginService.logout();
  }
}
