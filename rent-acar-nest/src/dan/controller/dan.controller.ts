import { Body, Controller, Get, Post } from "@nestjs/common";
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
}