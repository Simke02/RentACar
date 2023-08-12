import { Body, Controller, Get, Post } from "@nestjs/common";
import { NalogService } from "../service/nalog.service";
import { NalogI } from "../models/nalog.interface";
import { Observable } from "rxjs";

@Controller('nalozi')
export class NalogController {
    
    constructor(private nalogService: NalogService) {}

    @Post()
    DodajNalog(@Body() nalog: NalogI): Observable<NalogI>{
        return this.nalogService.DodajNalog(nalog);
    }

    @Get()
    VratiSveNaloge(): Observable<NalogI[]> {
        return this.nalogService.VratiSveNaloge();
    }
}