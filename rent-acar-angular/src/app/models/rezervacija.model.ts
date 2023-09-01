import { Automobil } from "./automobili.model";
import { Korisnik } from "./korisnik.model";

export interface RezervacijaD {
    ukupna_cena: number;
    vreme_izdavanja: Date;
    vreme_vracanja: Date;
    dodatno_osiguranje: boolean;
    korisnik: Korisnik;
    automobil: Automobil;
}