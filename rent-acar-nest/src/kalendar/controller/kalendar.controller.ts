import { Body, Controller, Get, Post } from "@nestjs/common";
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
}