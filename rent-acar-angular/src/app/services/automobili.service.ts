import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, concatMap, map, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { AutomobilD, Automobil } from "../models/automobili.model";
import { KalendarService } from "./kalendar.service";
import { DanService } from "./dan.service";

@Injectable({
    providedIn: 'root'
})
export class AutomobiliService {
    constructor(private http: HttpClient,
                private kalendarService: KalendarService,
                private danService: DanService) {}

    VratiOdgovarajuceAutomobile(tip: string, lokacija: string): Observable<Automobil[]> {
        return this.http.get<Automobil[]>(environment.baseApiUrl+`/automobili/${tip}/${lokacija}`);
    }

    DodajAutomobil(token: string, automobil: AutomobilD): Observable<AutomobilD> {
        const httpOptions = {
            headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)
        };
        return this.http.post<AutomobilD>(environment.baseApiUrl+'/automobili', automobil, httpOptions);
    }

    async TrenutnoDostupniAutomobili(automobili: Automobil[], vreme_i: string, vreme_v: string): Promise<Automobil[]> {
        let broj_dana = 0;
        const vreme_izdavanja = new Date(vreme_i);
        const vreme_vracanja = new Date(vreme_v);
        const razlika = vreme_vracanja.getTime() - vreme_izdavanja.getTime();
        broj_dana = Math.floor(razlika / (1000 * 3600 * 24));
        broj_dana += 1;
    
        let datumi: string[] = [];
        for (let i = 0; i < broj_dana; i++) {
            let datum;
            if (i == 0)
                datum = new Date(vreme_i);
            else if (i == broj_dana - 1)
                datum = new Date(vreme_v);
            else {
                datum = new Date(vreme_i);
                datum.setDate(datum.getDate() + i);
            }
            datum.setHours(0, 0, 0, 0);
            const godina = datum.getFullYear();
            const mesec = (datum.getMonth() + 1).toString().padStart(2, '0');
            const dani = datum.getDate().toString().padStart(2, '0');
            const sati = datum.getHours().toString().padStart(2, '0');
            const minuti = datum.getMinutes().toString().padStart(2, '0');
            datumi.push(`${godina}-${mesec}-${dani}T${sati}:${minuti}`);
        }
    
        try {
            const idjevi= await this.kalendarService.VratiIdOdgovarajucihKalendara(datumi).toPromise();
    
            if (idjevi===undefined || idjevi.length === 0) {
                return automobili;
            }
    
            const dani = await this.danService.VratiOdgovarajuceDane(idjevi).toPromise();
            if(dani===undefined)
                return automobili;
    
            dani.forEach(dan => {
                const automobil = automobili.find(auto => auto.id === dan.automobil.id);
                
                if (automobil) {
                    const vreme_iz_dana = new Date(dan.vreme);
                    
                    if (vreme_izdavanja <= vreme_iz_dana && vreme_iz_dana <= vreme_vracanja) {
                        automobili = automobili.filter(auto => auto.id !== automobil.id);
                    } else if (dan.izdavanje === true && vreme_iz_dana <= vreme_izdavanja) {
                        automobili = automobili.filter(auto => auto.id !== automobil.id);
                    }
                }
            });
    
            return automobili;
        } catch (error) {
            console.error(error);
            return automobili;
        }
    }
}