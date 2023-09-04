import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { DanService } from "../service/dan.service";
import { DanI } from "../models/dan.interface";

@Controller('dani')
export class DanController {
    
    constructor(private danService: DanService) {}

    @Post()
    DodajDan(@Body() dan: DanI): Observable<DanI>{
        return this.danService.DodajDan(dan);
    }

    @Get()
    VratiSveDane(): Observable<DanI[]> {
        return this.danService.VratiSveDane();
    }

    @Get('odg/:id')
    VratiOdgovarajuceDane(@Param('id') id: string): Promise<DanI[]> {
        const idjeviNiz = id.split('-').map(Number);
        return this.danService.VratiOdgovarajuceDane(idjeviNiz);
    }
}