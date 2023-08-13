import { Body, Controller, Get, Post } from "@nestjs/common";
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

    @Get()
    VratiSveAutomobile(): Observable<AutomobilI[]> {
        return this.automobilService.VratiSveAutomobile();
    }
}