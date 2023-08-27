import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Automobil } from "../models/automobili.model";

@Injectable({
    providedIn: 'root'
})
export class AutomobiliService {
    constructor(private http: HttpClient) {}

    VratiOdgovarajuceAutomobile(tip: string, lokacija: string): Observable<Automobil[]> {
        return this.http.get<Automobil[]>(environment.baseApiUrl+`/automobili/${tip}/${lokacija}`);
    }
}