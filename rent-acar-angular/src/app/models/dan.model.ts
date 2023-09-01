import { Automobil } from "./automobili.model";
import { Kalendar } from "./kalendar.model";

export interface Dan {
    id: number;
    vreme_vracanja: Date;
    automobil: Automobil;
    kalendar: Kalendar;
}

export interface DanD {
    vreme_vracanja: Date;
    automobil: Automobil;
    kalendar: Kalendar;
}