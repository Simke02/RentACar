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

    @UseGuards(JwtAuthGuard)
    @Get()
    VratiSveAdministratore(@Request() req): Observable<AdministratorI[]> {
        if(req.user.role===true)
            return this.administratorService.VratiSveAdministratore();
        else
            throw new HttpException('Niste autorizovani za ovu akciju', HttpStatus.FORBIDDEN);
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

    @UseGuards(JwtAuthGuard)
    @Delete('obrisi/:email')
    ObrisiAdministratora(@Request() req, @Param('email') email: string): Promise<any>{
        if(req.user.role===true)
            return this.administratorService.ObrisiAdministratora(email);
        else
            throw new HttpException('Niste autorizovani za ovu akciju', HttpStatus.FORBIDDEN);
    }
}