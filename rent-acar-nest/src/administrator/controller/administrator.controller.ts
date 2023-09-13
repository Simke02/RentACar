import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { AdministratorService } from "../service/administrator.service";
import { AdministratorI } from "../models/administrator.interface";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller('administratori')
export class AdministratorController {

    constructor(private administratorService: AdministratorService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    DodajAministratora(@Request() req, @Body() administrator: AdministratorI): Observable<AdministratorI> {
        if(req.user.role===true)
            return this.administratorService.DodajAdministratora(administrator);
        else
            throw new HttpException('Niste autorizovani za ovu akciju', HttpStatus.FORBIDDEN);
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