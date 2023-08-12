import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Nalog } from "../models/nalog.entity";
import { Repository } from "typeorm";
import { NalogI } from "../models/nalog.interface";
import { Observable, from } from "rxjs";

@Injectable()
export class NalogService{
    
    constructor(
        @InjectRepository(Nalog)
        private nalogRepository: Repository<Nalog>
    ) {}

    DodajNalog(nalog: NalogI): Observable<NalogI>{
        return from(this.nalogRepository.save(nalog));
    }

    VratiSveNaloge(): Observable<NalogI[]> {
        return from(this.nalogRepository.find());
    }
}