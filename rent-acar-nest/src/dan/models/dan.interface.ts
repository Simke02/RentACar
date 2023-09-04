import { Automobil } from "src/automobil/models/automobil.entity";
import { Kalendar } from "src/kalendar/models/kalendar.entity";

export interface DanI {
    id: number;
    vreme: string;
    izdavanje: boolean;
    automobil: Automobil;
    kalendar: Kalendar;
}