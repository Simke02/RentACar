import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  loginForm: FormGroup;
  helper = new JwtHelperService();
  prikazSifre: string = "password";

  constructor(private loginService: LoginService,
              private router: Router){
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'sifra': new FormControl(null, Validators.required)
    })
  }

  PrijavljanjeZavrseno(){
    const email = this.loginForm.get('email')?.value;
    const sifra = this.loginForm.get('sifra')?.value;
    this.loginService.Login(email, sifra).subscribe(
      (token: any) => {
        localStorage.setItem('token', token.access_token);

        const dekodiranToken = this.helper.decodeToken(token.access_token);
        if(dekodiranToken.role === true)
          this.loginService.admin.next(true);
        this.loginService.ulogovan.next(true);
        
        this.loginService.autoLogout(3600*1000);
        this.router.navigate(['']);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  prikazi(){
    if(this.prikazSifre === "password")
      this.prikazSifre = "text";
    else
      this.prikazSifre = "password"
  }

  napraviNalog(){
    this.router.navigate(['/signup']);
  }
}
