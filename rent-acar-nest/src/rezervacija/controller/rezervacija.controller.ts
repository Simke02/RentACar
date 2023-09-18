import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, HttpException, HttpStatus } from "@nestjs/common";
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

    @UseGuards(JwtAuthGuard)
    @Get()
    VratiSveRezervacije(@Request() req): Observable<RezervacijaI[]> {
        if(req.user.role === true)
            return this.rezervacijaService.VratiSveRezervacije();
        else
            throw new HttpException('Niste autorizovani za ovu akciju', HttpStatus.FORBIDDEN);
    }

    @UseGuards(JwtAuthGuard)
    @Get('korisnikove')
    VratiKorisnikoveRezervacije(@Request() req): Observable<RezervacijaI[]> {
        return this.rezervacijaService
                .VratiKorisnikoveRezervacije(req.user.nalog.email);
    }

    @Put('azuriraj/:id')
    AzurirajRezervaciju(@Param('id') id: string, @Body() rezervacija:RezervacijaI): Promise<RezervacijaI>{
        return this.rezervacijaService.AzurirajRezervaciju(id, rezervacija);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('obrisi/:id')
    ObrisiRezervaciju(@Request() req, @Param('id') id: string): Promise<any>{
        if(req.user.role === true)
            return this.rezervacijaService.ObrisiRezervaciju(id);
        else
            throw new HttpException('Niste autorizovani za ovu akciju', HttpStatus.FORBIDDEN);
    }
}