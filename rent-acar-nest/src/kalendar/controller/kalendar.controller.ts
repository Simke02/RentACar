import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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
}