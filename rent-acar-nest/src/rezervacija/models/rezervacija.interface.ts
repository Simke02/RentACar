import { Automobil } from "src/automobil/models/automobil.entity";
import { Korisnik } from "src/korisnik/models/korisnik.entity";

export interface RezervacijaI {
    id: number;
    ukupna_cena: number;
    vreme_izdavanja: string;
    vreme_vracanja: string;
    dodatno_osiguranje: boolean;
    korisnik: Korisnik;
    automobil: Automobil;
}