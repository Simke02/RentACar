import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, from } from "rxjs";
import { Kalendar } from "../models/kalendar.entity";
import { KalendarI } from "../models/kalendar.interface";

@Injectable()
export class KalendarService{
    
    constructor(
        @InjectRepository(Kalendar)
        private kalendarRepository: Repository<Kalendar>
    ) {}

    DodajKalendar(kalendar: KalendarI): Observable<KalendarI>{
        return from(this.kalendarRepository.save(kalendar));
    }

    VratiSveKalendare(): Observable<KalendarI[]> {
        return from(this.kalendarRepository.find());
    }

    VratiOdgovarajuciKalendar(datum: Date): Promise<KalendarI> {
        return this.kalendarRepository.findOne({where: {datum: datum}});
    }
}