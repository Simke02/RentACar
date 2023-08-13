import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, from } from "rxjs";
import { Dan } from "../models/dan.entity";
import { DanI } from "../models/dan.interface";

@Injectable()
export class DanService{
    
    constructor(
        @InjectRepository(Dan)
        private danRepository: Repository<Dan>
    ) {}

    DodajDan(dan: DanI): Observable<DanI>{
        return from(this.danRepository.save(dan));
    }

    VratiSveDane(): Observable<DanI[]> {
        return from(this.danRepository.find());
    }
}