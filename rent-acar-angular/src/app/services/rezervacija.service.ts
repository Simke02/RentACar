import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Rezervacija, RezervacijaD } from "../models/rezervacija.model";

@Injectable({
    providedIn: 'root'
})
export class RezervacijaService {
    constructor(private http: HttpClient) {}

    ProcitajDrzave(): Observable<string>{
        return this.http.get('assets/data/drzave.txt', { responseType: 'text' });
    }

    DodajRezervacija(rezervacija: RezervacijaD): Observable<RezervacijaD> {
        return this.http.post<RezervacijaD>(environment.baseApiUrl+'/rezervacije', rezervacija);
    }

    VratiKorisnikoveRezervacije(token: string): Observable<Rezervacija[]>{
        const httpOptions = {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        };
        return this.http.get<Rezervacija[]>(environment.baseApiUrl+'/rezervacije/korisnikove', httpOptions);
    }

    VratiSveRezervacije(token: string): Observable<Rezervacija[]>{
        const httpOptions = {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        };
        return this.http.get<Rezervacija[]>(environment.baseApiUrl+'/rezervacije', httpOptions);
    }
}