import { Automobil } from "./automobili.model";
import { Kalendar } from "./kalendar.model";

export interface Dan {
    id: number;
    vreme: string;
    izdavanje: boolean;
    automobil: Automobil;
    kalendar: Kalendar;
}

export interface DanD {
    vreme: string;
    izdavanje: boolean;
    automobil: Automobil;
    kalendar: Kalendar;
}