import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RezervacijaD } from "../models/rezervacija.model";

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
}