import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from "@nestjs/common";
import { Observable } from "rxjs";
import { RezervacijaService } from "../service/rezervacija.service";
import { RezervacijaI } from "../models/rezervacija.interface";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('rezervacije')
export class RezervacijaController {
    
    constructor(private rezervacijaService: RezervacijaService) {}

    @Post()
    DodajRezervacija(@Body() rezervacija: RezervacijaI): Observable<RezervacijaI>{
        return this.rezervacijaService.DodajRezervacija(rezervacija);
    }

    @Get()
    VratiSveRezervacije(): Observable<RezervacijaI[]> {
        return this.rezervacijaService.VratiSveRezervacije();
    }

    @UseGuards(JwtAuthGuard)
    @Get('korisnikove')
    VratiKorisnikoveRezervacije(@Request() req): Observable<RezervacijaI[]> {
        return this.rezervacijaService
                .VratiKorisnikoveRezervacije(req.user.rezultat.email);
    }

    @Put('azuriraj/:id')
    AzurirajRezervaciju(@Param('id') id: string, @Body() rezervacija:RezervacijaI): Promise<RezervacijaI>{
        return this.rezervacijaService.AzurirajRezervaciju(id, rezervacija);
    }

    @Delete('obrisi/:id')
    ObrisiRezervaciju(@Param('id') id: string): Promise<any>{
        return this.rezervacijaService.ObrisiRezervaciju(id);
    }
}