import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdministratorService } from "src/administrator/service/administrator.service";
import { KorisnikI } from "src/korisnik/models/korisnik.interface";
import { KorisnikService } from "src/korisnik/service/korisnik.service";

@Injectable({})
export class AuthService {

    constructor(private korisnikService: KorisnikService,
                private jwt: JwtService,
                private administratorService: AdministratorService) {}

    async ValidirajNalog(email: string, sifra: string): Promise<any> {
        let nalog: any = await this.administratorService.VratiAdministratora(email);
        let uloga: boolean = true;
        
        if(!nalog){
            nalog = await this.korisnikService.VratiKorisnika(email);
            if(nalog)
                uloga = false;
        }

        if(nalog && nalog.sifra == sifra){
            const {sifra, ...rezultat} = nalog;
            return {rezultat, uloga};
        }
        else
            return null;
    }

    async login(korisnik: any) {
        const payload = {email: korisnik.rezultat.email, sub: korisnik.rezultat.id,
                        role: korisnik.uloga};

        return {
            access_token: this.jwt.sign(payload),
        }
    }
}