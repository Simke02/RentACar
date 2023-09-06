import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
import { Observable } from "rxjs";
import { KalendarService } from "../service/kalendar.service";
import { KalendarI } from "../models/kalendar.interface";

@Controller('kalendari')
export class KalendarController {
    
    constructor(private kalendarService: KalendarService) {}

    @Post()
    DodajKalendar(@Body() kalendar: KalendarI): Observable<KalendarI>{
        return this.kalendarService.DodajKalendar(kalendar);
    }

    @Get()
    VratiSveKalendare(): Observable<KalendarI[]> {
        return this.kalendarService.VratiSveKalendare();
    }

    @Get(':datum')
    VratiOdgovarajuciKalendar(@Param('datum') datum: string): Promise<KalendarI> {
        return this.kalendarService.VratiOdgovarajuciKalendar(datum);
    }

    @Get('id/:datumi')
    VratiIdOdgovarajucihKalendara(@Param('datumi') datumi: string): Promise<number[]> {
        console.log(datumi);
        const datumiNiz = datumi.split('--');
        console.log(datumiNiz);
        return this.kalendarService.VratiIdOdgovarajucihKalendara(datumiNiz);
    }

    @Put('azuriraj/:datum')
    AzurirajKalendar(@Param('datum') datum: string, @Body() kalendar:KalendarI): Promise<KalendarI>{
        return this.kalendarService.AzurirajKalendar(datum, kalendar);
    }

    @Delete('obrisi/:datum')
    ObrisiKalendar(@Param('datum') datum: string): Promise<any>{
        return this.kalendarService.ObrisiKalendar(datum);
    }
}