import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { KorisnikD, Korisnik } from "../models/korisnik.model";

@Injectable({
    providedIn: 'root'
})
export class KorisnikService {
    constructor(private http: HttpClient) {}

    DodajKorisnika(korisnik: KorisnikD): Observable<KorisnikD> {
        return this.http.post<KorisnikD>(environment.baseApiUrl+'/korisnici', korisnik);
    }

    VratiIdKorisnika(email: string): Observable<number> {
        return this.http.get<number>(environment.baseApiUrl+`/korisnici/konkretanId/${email}`);
    }

    VratiKorisnika(email: string): Observable<Korisnik> {
        return this.http.get<Korisnik>(environment.baseApiUrl+`/korisnici/konkretan/${email}`);
    }
}