import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Observable } from "rxjs";
import { AdministratorService } from "../service/administrator.service";
import { AdministratorI } from "../models/administrator.interface";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

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

    @Get('konkretan/:email')
    VratiAdministratora(@Param('email') email: string): Promise<AdministratorI> {
        return this.administratorService.VratiAdministratora(email);
    }

    @UseGuards(JwtAuthGuard)
    @Put('azuriraj/:email')
    AzurirajAdministratora(@Param('email') email: string, @Body() administrator:AdministratorI): Promise<AdministratorI>{
        return this.administratorService.AzurirajAdministratora(email, administrator);
    }

    @Delete('obrisi/:email')
    ObrisiAdministratora(@Param('email') email: string): Promise<any>{
        return this.administratorService.ObrisiAdministratora(email);
    }
}