import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    constructor(private http: HttpClient) {}

    ProcitajTipove(): Observable<string>{
        return this.http.get('assets/data/tipoviAut.txt', { responseType: 'text' });
    }
    ProcitajLokacije(): Observable<string>{
        return this.http.get('assets/data/lokacije.txt', { responseType: 'text' });
    }
}