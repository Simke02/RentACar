import { Automobil } from "./automobili.model";
import { Korisnik } from "./korisnik.model";

export interface RezervacijaD {
    ukupna_cena: number;
    vreme_izdavanja: string;
    vreme_vracanja: string;
    dodatno_osiguranje: boolean;
    korisnik: Korisnik;
    automobil: Automobil;
}

export interface Rezervacija {
    id: number;
    ukupna_cena: number;
    vreme_izdavanja: string;
    vreme_vracanja: string;
    dodatno_osiguranje: boolean;
    korisnik: Korisnik;
    automobil: Automobil;
}