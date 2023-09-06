import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { Observable } from "rxjs";
import { AutomobilService } from "../service/automobil.service";
import { AutomobilI } from "../models/automobil.interface";

@Controller('automobili')
export class AutomobilController {
    
    constructor(private automobilService: AutomobilService) {}

    @Post()
    DodajAutomobil(@Body() automobil: AutomobilI): Observable<AutomobilI>{
        return this.automobilService.DodajAutomobil(automobil);
    }

    @Get(':tip/:lokacija')
    VratiOdgovarajuceAutomobile(@Param('tip') tip: string, @Param('lokacija') lokacija: string): Observable<AutomobilI[]> {
        return this.automobilService.VratiOdgovarajuceAutomobile(tip, lokacija);
    }

    @Get('sve')
    VratiSveAutomobile(): Observable<AutomobilI[]> {
        return this.automobilService.VratiSveAutomobile();
    }

    @Put('azuriraj/:id')
    AzurirajAutomobil(@Param('id') id: string, @Body() automobil:AutomobilI): Promise<AutomobilI>{
        return this.automobilService.AzurirajAutomobil(id, automobil);
    }

    @Delete('obrisi/:id')
    ObrisiAutomobil(@Param('id') id: string): Promise<any>{
        return this.automobilService.ObrisiAutomobil(id);
    }
}