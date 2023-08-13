import { Automobil } from "src/automobil/models/automobil.entity";
import { Kalendar } from "src/kalendar/models/kalendar.entity";

export interface DanI {
    id: number;
    vreme_vracanja: Date;
    automobil: Automobil;
    kalendar: Kalendar;
}