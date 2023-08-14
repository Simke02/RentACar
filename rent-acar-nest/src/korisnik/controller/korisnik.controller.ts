import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { KorisnikService } from "../service/korisnik.service";
import { KorisnikI } from "../models/korisnik.interface";

@Controller('korisnici')
export class KorisnikController {
    
    constructor(private korisnikService: KorisnikService) {}

    @Post()
    DodajKorisnika(@Body() korisnik: KorisnikI): Observable<KorisnikI>{
        return this.korisnikService.DodajKorisnika(korisnik);
    }

    @Get()
    VratiSveKorisnike(): Observable<KorisnikI[]> {
        return this.korisnikService.VratiSveKorisnike();
    }

    @Get('konkretan')
    VratiKorisnika(@Body('email') email: string): Promise<KorisnikI> {
        return this.korisnikService.VratiKorisnika(email);
    }
}