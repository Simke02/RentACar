import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Observable, from } from "rxjs";
import { Korisnik } from "../models/korisnik.entity";
import { KorisnikI } from "../models/korisnik.interface";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class KorisnikService{
    
    constructor(
        @InjectRepository(Korisnik)
        private korisnikRepository: Repository<Korisnik>,
        private mailerService: MailerService
    ) {}

    async DodajKorisnika(korisnik: KorisnikI): Promise<KorisnikI>{
        const pronadjen = await this.korisnikRepository.findOne({where: {email: korisnik.email}});
        if(pronadjen){
            if(pronadjen.sifra===""){
                return await this.AzurirajKorisnika(korisnik.email, korisnik);
            }else{
                this.mailerService.sendMail({
                    to: korisnik.email,
                    from: 'sholayacar@gmail.com',
                    subject: 'Otvaranje naloga na SholayaCar',
                    html: `Uspešno ste otvorili nalog na aplikaciji SholayaCar`
                })

                return await this.korisnikRepository.save(korisnik)
            }
        }
        return await this.korisnikRepository.save(korisnik);
    }

    VratiSveKorisnike(): Observable<KorisnikI[]> {
        return from(this.korisnikRepository.find());
    }

    VratiKorisnika(email: string): Promise<KorisnikI> {
        return this.korisnikRepository.findOne({where: {email: email}});
    }

    async VratiIdKorisnika(email: string): Promise<number> {
        const korisnik = await this.korisnikRepository.findOne({where: {email: email}});
        return korisnik.id;
    }

    async AzurirajKorisnika(email: string, korisnik: KorisnikI): Promise<KorisnikI> {
        await this.korisnikRepository.update({email: email}, korisnik);
        return this.korisnikRepository.findOne({where: {email: email}});
    }

    ObrisiKorisnika(email: string): Promise<any>{
        return this.korisnikRepository.delete({email: email});
    }
}