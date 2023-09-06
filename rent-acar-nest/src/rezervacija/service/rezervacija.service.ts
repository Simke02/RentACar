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
        return from(this.rezervacijaRepository.find({
            relations: ['korisnik', 'automobil']
        }));
    }

    VratiKorisnikoveRezervacije(email: string): Observable<RezervacijaI[]> {
        return from(this.rezervacijaRepository.find({
            relations: ['korisnik', 'automobil'],
            where: {
                korisnik: {
                    email: email
                },
            }
        }));
    }

    async AzurirajRezervaciju(id: string, rezervacija: RezervacijaI): Promise<RezervacijaI> {
        await this.rezervacijaRepository.update(id, rezervacija)
        return this.rezervacijaRepository.findOne({where: {id: Number(id)}});
    }

    ObrisiRezervaciju(id: string): Promise<any>{
        return this.rezervacijaRepository.delete(id);
    }
}