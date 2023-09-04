import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
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

    VratiOdgovarajuciKalendar(datum: string): Promise<KalendarI> {
        return this.kalendarRepository.findOne({where: {datum: datum}});
    }

    async VratiIdOdgovarajucihKalendara(datumi: string[]): Promise<number[]> {
        const kalendari = await this.kalendarRepository.find({
            where: {datum: In(datumi)},
            select: ['id'],
        });
        console.log(kalendari);
        const idNiz = kalendari.map(kalendar => kalendar.id);
        return idNiz;
    }
}