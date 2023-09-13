import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Administrator, AdministratorD } from "../models/administrator.model";

@Injectable({
    providedIn: 'root'
})
export class AdministratorService {
    constructor(private http: HttpClient) {}

    DodajAdministratora(token: string, administrator: AdministratorD): Observable<AdministratorD> {
        const httpOptions = {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        };
        return this.http.post<AdministratorD>(environment.baseApiUrl+'/administratori', administrator, httpOptions);
    }

    AzurirajAdministratora(email: string, administrator: Administrator, token: string): Observable<Administrator> {
        const httpOptions = {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        };
        return this.http.put<Administrator>(environment.baseApiUrl+`/administratori/azuriraj/${email}`, administrator, httpOptions);
    }
}