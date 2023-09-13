import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { KorisnikD, Korisnik } from "../models/korisnik.model";
import { Router } from "@angular/router";
import { RezervisiService } from "./rezervisi.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private tokenExpirationTimer:any;
    ulogovan = new BehaviorSubject<boolean>(false);
    admin = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient,
                private router: Router,
                private rezervisiService: RezervisiService) {}

    Login(username: string, password: string) {
        const body = {username, password};

        return this.http.post(environment.baseApiUrl+'/auth/login', body);
    }

    getProfile(token: string): Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        };
        return this.http.get<any>(environment.baseApiUrl+'/profile', httpOptions);
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(()=>{
            console.log("caos");
            this.logout();
        }, expirationDuration);
    }

    logout(){
        console.log("izlogovan");
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
        this.rezervisiService.obrisiAuto();
        this.ulogovan.next(false);
        this.admin.next(false);
        
        if(this.tokenExpirationTimer){
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }
}