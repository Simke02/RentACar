import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, from } from "rxjs";
import { Rezervacija } from "../models/rezervacija.entity";
import { RezervacijaI } from "../models/rezervacija.interface";

@Injectable()
export class RezervacijaService{
    
    constructor(
        @InjectRepository(Rezervacija)
        private rezervacijaRepository: Repository<Rezervacija>
    ) {}

    DodajRezervacija(rezervacija: RezervacijaI): Observable<RezervacijaI>{
        return from(this.rezervacijaRepository.save(rezervacija));
    }

    VratiSveRezervacije(): Observable<RezervacijaI[]> {
        return from(this.rezervacijaRepository.find());
    }
}