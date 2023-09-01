import { Injectable } from '@angular/core';
import { Automobil } from '../models/automobili.model';

@Injectable({
  providedIn: 'root'
})
export class RezervisiService {
    sacuvajAuto(auto: Automobil){
        sessionStorage.setItem('auto', JSON.stringify(auto));
    }

    vratiAuto(): any {
        const auto = sessionStorage.getItem('auto');
        if(auto!=null)
            return JSON.parse(auto);
    }

    obrisiAuto() {
        sessionStorage.removeItem('auto');
    }

    vratiOsiguranje(): number {
        const vrednost = sessionStorage.getItem('auto');
        if(vrednost!=null){
            const auto: Automobil = JSON.parse(vrednost);
            return auto.dodatno_osiguranje;
        }
        return 0;
    }

    sacuvajBoolOsiguranje(daLi: boolean) {
        sessionStorage.setItem('osiguranjeBool', JSON.stringify(daLi));
    }

    vratiBoolOsiguranje(): any {
        const osigB = sessionStorage.getItem('osiguranjeBool');
        if(osigB!=null)
            return JSON.parse(osigB);
    }

    obrisiBoolOsiguranje() {
        sessionStorage.removeItem('osiguranjeBool');
    }

    sacuvajVremeIzdavanja(vreme: Date){
        sessionStorage.setItem('vremeIzdavanja', JSON.stringify(vreme));
    }

    sacuvajVremeVracanja(vreme: Date){
        sessionStorage.setItem('vremeVracanja', JSON.stringify(vreme));
    }

    vratiVremeIzdavanja(): any {
        const vreme = sessionStorage.getItem('vremeIzdavanja');
        if(vreme!=null)
            return JSON.parse(vreme);
    }

    vratiVremeVracanja(): any {
        const vreme = sessionStorage.getItem('vremeVracanja');
        if(vreme!=null)
            return JSON.parse(vreme);
    }

    obrisiVremeIzdavanja(){
        sessionStorage.removeItem('vremeIzdavanja');
    }

    obrisiVremeVracanja(){
        sessionStorage.removeItem('vremeVracanja');
    }

    sacuvajNoviZahtev(){
        sessionStorage.setItem('noviZahtev', JSON.stringify(true));
    }

    vratiNoviZahtev(): any {
        const zahtev = sessionStorage.getItem('noviZahtev');
        if(zahtev!=null)
            return JSON.parse(zahtev);
    }

    izmeniNoviZahtev(){
        sessionStorage.setItem('noviZahtev',JSON.stringify(false));
    }

    obrisiNoviZahtev(){
        sessionStorage.removeItem('noviZahtev');
    }
}