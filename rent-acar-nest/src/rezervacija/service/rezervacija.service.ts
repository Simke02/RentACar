import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, from, map, switchMap } from "rxjs";
import { Rezervacija } from "../models/rezervacija.entity";
import { RezervacijaI } from "../models/rezervacija.interface";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class RezervacijaService{
    
    constructor(
        @InjectRepository(Rezervacija)
        private rezervacijaRepository: Repository<Rezervacija>,
        private mailerService: MailerService
    ) {}

    DodajRezervacija(rezervacija: RezervacijaI): Observable<RezervacijaI>{
        return from(this.rezervacijaRepository.save(rezervacija)).pipe(
            switchMap((rezervacija) => {
                return from(this.mailerService.sendMail({
                    to: [rezervacija.korisnik.email, 'sholayacar@gmail.com'],
                    from: 'andrijasimovic2002@gmail.com',
                    subject: 'Rezervacija automobila',
                    html: `Uspešno ste rezervisali automobil ${rezervacija.automobil.marka} 
                    ${rezervacija.automobil.model}. Broj vaše rezervacije je ${rezervacija.id}`
                })).pipe(
                    map(() => rezervacija)
                )
            })
        )
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