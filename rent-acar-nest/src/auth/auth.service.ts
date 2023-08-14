import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { KorisnikI } from "src/korisnik/models/korisnik.interface";
import { KorisnikService } from "src/korisnik/service/korisnik.service";

@Injectable({})
export class AuthService {

    constructor(private korisnikService: KorisnikService, private jwt: JwtService) {}

    async ValidirajKorisnika(email: string, sifra: string): Promise<any> {
        const korisnik = await this.korisnikService.VratiKorisnika(email);
        
        if(korisnik && korisnik.sifra == sifra)
            return korisnik;
        else
            return null;
    }

    async login(korisnik: any) {
        const payload = {name: korisnik.email, sub: korisnik.id};

        return {
            access_token: this.jwt.sign(payload),
        }
    }
}