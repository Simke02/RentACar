import { Body, Controller, Get, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { RezervacijaService } from "../service/rezervacija.service";
import { RezervacijaI } from "../models/rezervacija.interface";

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
}