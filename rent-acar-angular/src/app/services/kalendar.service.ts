import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Kalendar, KalendarD } from "../models/kalendar.model";

@Injectable({
    providedIn: 'root'
})
export class KalendarService {
    constructor(private http: HttpClient) {}

    DodajKalendar(kalendar: KalendarD): Observable<KalendarD> {
        return this.http.post<KalendarD>(environment.baseApiUrl+'/kalendari', kalendar);
    }

    VratiOdgovarajuciKalendar(datum: string): Observable<Kalendar> {
        return this.http.get<Kalendar>(environment.baseApiUrl+`/kalendari/${datum}`);
    }

    VratiIdOdgovarajucihKalendara(datumi: string[]): Observable<number[]> {
        let nastavak: string = "/kalendari/id/";
        datumi.forEach(datum => {
            nastavak += (datum+"--");
        });
        return this.http.get<number[]>(environment.baseApiUrl+nastavak);
    }
}