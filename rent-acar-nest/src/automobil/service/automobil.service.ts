import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, from } from "rxjs";
import { Automobil } from "../models/automobil.entity";
import { AutomobilI } from "../models/automobil.interface";

@Injectable()
export class AutomobilService{
    
    constructor(
        @InjectRepository(Automobil)
        private automobilRepository: Repository<Automobil>
    ) {}

    DodajAutomobil(automobil: AutomobilI): Observable<AutomobilI>{
        return from(this.automobilRepository.save(automobil));
    }

    VratiOdgovarajuceAutomobile(tip: string, lokacija: string): Observable<AutomobilI[]> {
        return from(this.automobilRepository.find({
            where: {tip: tip, lokacija: lokacija}
        }));
    }

    VratiSveAutomobile(): Observable<AutomobilI[]>{
        return from(this.automobilRepository.find());
    }

    async AzurirajAutomobil(id: string, automobil: AutomobilI): Promise<AutomobilI> {
        await this.automobilRepository.update(id, automobil)
        return this.automobilRepository.findOne({where: {id: Number(id)}});
    }

    ObrisiAutomobil(id: string): Promise<any>{
        return this.automobilRepository.delete(id);
    }

    VratiAutomobil(id: string): Observable<Automobil> {
        return from(this.automobilRepository.findOne({
            where: {id: Number(id)}
        }))
    }
}