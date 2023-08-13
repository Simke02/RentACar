import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, from } from "rxjs";
import { Korisnik } from "../models/korisnik.entity";
import { KorisnikI } from "../models/korisnik.interface";

@Injectable()
export class KorisnikService{
    
    constructor(
        @InjectRepository(Korisnik)
        private korisnikRepository: Repository<Korisnik>
    ) {}

    DodajKorisnika(korisnik: KorisnikI): Observable<KorisnikI>{
        return from(this.korisnikRepository.save(korisnik));
    }

    VratiSveKorisnike(): Observable<KorisnikI[]> {
        return from(this.korisnikRepository.find());
    }
}