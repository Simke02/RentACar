import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Dan, DanD } from "../models/dan.model";

@Injectable({
    providedIn: 'root'
})
export class DanService {
    constructor(private http: HttpClient) {}

    DodajDan(dan: DanD): Observable<DanD> {
        return this.http.post<DanD>(environment.baseApiUrl+'/dani', dan);
    }

    VratiSveDane(): Observable<Dan[]> {
        return this.http.get<Dan[]>(environment.baseApiUrl+'/dani');
    }

    VratiOdgovarajuceDane(idjevi: number[]): Observable<Dan[]> {
        let nastavak: string = "/dani/odg/";
        idjevi.forEach(id => {
            nastavak += (id + "-");
        });
        return this.http.get<Dan[]>(environment.baseApiUrl+nastavak);
    }
}