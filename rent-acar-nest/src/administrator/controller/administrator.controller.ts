import { Body, Controller, Get, Post } from "@nestjs/common";
import { Observable } from "rxjs";
import { AdministratorService } from "../service/administrator.service";
import { AdministratorI } from "../models/administrator.interface";

@Controller('administratori')
export class AdministratorController {

    constructor(private administratorService: AdministratorService) {}

    @Post()
    DodajAministratora(@Body() administrator: AdministratorI): Observable<AdministratorI> {
        return this.administratorService.DodajAdministratora(administrator);
    }

    @Get()
    VratiSveAdministratore(): Observable<AdministratorI[]> {
        return this.administratorService.VratiSveAdministratore();
    }
}