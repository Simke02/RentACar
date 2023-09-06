import { Body, Controller, Get, Param, Post, Put, Delete } from "@nestjs/common";
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

    @Put('azuriraj/:id')
    AzurirajDan(@Param('id') id: string, @Body() dan:DanI): Promise<DanI>{
        return this.danService.AzurirajDan(id, dan);
    }

    //brise po kalendar id
    @Delete('obrisi/:id')
    ObrisiDan(@Param('id') id: string): Promise<any>{
        return this.danService.ObrisiDan(id);
    }
}