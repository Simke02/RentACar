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

    @Get('konkretan/:email')
    VratiKorisnika(@Param('email') email: string): Promise<KorisnikI> {
        return this.korisnikService.VratiKorisnika(email);
    }

    @Get('konkretanId/:email')
    VratiIdKorisnika(@Param('email') email: string): Promise<number> {
        return this.korisnikService.VratiIdKorisnika(email);
    }
}