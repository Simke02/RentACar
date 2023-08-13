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

    VratiSveAutomobile(): Observable<AutomobilI[]> {
        return from(this.automobilRepository.find());
    }
}