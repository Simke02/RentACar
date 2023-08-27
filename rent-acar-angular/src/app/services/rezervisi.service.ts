import { Injectable } from '@angular/core';
import { Automobil } from '../models/automobili.model';

@Injectable({
  providedIn: 'root'
})
export class RezervisiService {
    sacuvajAuto(auto: Automobil){
        localStorage.setItem('auto', JSON.stringify(auto));
    }

    vratiAuto(): any {
        const auto = localStorage.getItem('auto');
        if(auto!=null)
            return JSON.parse(auto);
    }

    obrisiAuto() {
        localStorage.removeItem('auto');
    }

    vratiOsiguranje(): number {
        const vrednost = localStorage.getItem('auto');
        if(vrednost!=null){
            const auto: Automobil = JSON.parse(vrednost);
            return auto.dodatno_osiguranje;
        }
        return 0;
    }

    sacuvajBoolOsiguranje(daLi: boolean) {
        localStorage.setItem('osiguranjeBool', JSON.stringify(daLi));
    }

    vratiBoolOsiguranje(): any {
        const osigB = localStorage.getItem('osiguranjeBool');
        if(osigB!=null)
            return JSON.parse(osigB);
    }

    obrisiBoolOsiguranje() {
        localStorage.removeItem('osiguranjeBool');
    }
}