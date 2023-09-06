import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Observable } from "rxjs";
import { KorisnikService } from "../service/korisnik.service";
import { KorisnikI } from "../models/korisnik.interface";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('korisnici')
export class KorisnikController {
    
    constructor(private korisnikService: KorisnikService) {}

    @Post()
    DodajKorisnika(@Body() korisnik: KorisnikI): Promise<KorisnikI>{
        return this.korisnikService.DodajKorisnika(korisnik);
    }

    @UseGuards(JwtAuthGuard)
    @Put('azuriraj/:email')
    AzurirajKorisnika(@Param('email') email: string, @Body() korisnik:KorisnikI): Promise<KorisnikI>{
        return this.korisnikService.AzurirajKorisnika(email, korisnik);
    }

    @Delete('obrisi/:email')
    ObrisiKorisnika(@Param('email') email: string): Promise<any>{
        return this.korisnikService.ObrisiKorisnika(email);
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