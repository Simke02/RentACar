import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, from } from "rxjs";
import { Administrator } from "../models/administrator.entity";
import { AdministratorI } from "../models/administrator.interface";

@Injectable()
export class AdministratorService{

    constructor(
        @InjectRepository(Administrator)
        private administratorRepository: Repository<Administrator>)
        {}

        DodajAdministratora(administrator: AdministratorI): Observable<AdministratorI>{
            return from(this.administratorRepository.save(administrator));
        }

        VratiSveAdministratore(): Observable<AdministratorI[]> {
            return from(this.administratorRepository.find());
        }
}