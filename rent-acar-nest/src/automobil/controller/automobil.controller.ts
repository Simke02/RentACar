import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, HttpException, HttpStatus } from "@nestjs/common";
import { Observable } from "rxjs";
import { AutomobilService } from "../service/automobil.service";
import { AutomobilI } from "../models/automobil.interface";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Automobil } from "../models/automobil.entity";

@Controller('automobili')
export class AutomobilController {
    
    constructor(private automobilService: AutomobilService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    DodajAutomobil(@Request() req, @Body() automobil: AutomobilI): Observable<AutomobilI>{
        if(req.user.role===true)
            return this.automobilService.DodajAutomobil(automobil);
        else
            throw new HttpException('Niste autorizovani za ovu akciju', HttpStatus.FORBIDDEN);
    }

    @Get(':tip/:lokacija')
    VratiOdgovarajuceAutomobile(@Param('tip') tip: string, @Param('lokacija') lokacija: string): Observable<AutomobilI[]> {
        return this.automobilService.VratiOdgovarajuceAutomobile(tip, lokacija);
    }

    @UseGuards(JwtAuthGuard)
    @Get('sve')
    VratiSveAutomobile(@Request() req): Observable<AutomobilI[]> {
        if(req.user.role===true)
            return this.automobilService.VratiSveAutomobile();
        else
            throw new HttpException('Niste autorizovani za ovu akciju', HttpStatus.FORBIDDEN);
    }

    @UseGuards(JwtAuthGuard)
    @Put('azuriraj/:id')
    AzurirajAutomobil(@Request() req, @Param('id') id: string, @Body() automobil:AutomobilI): Promise<AutomobilI>{
        if(req.user.role===true)
            return this.automobilService.AzurirajAutomobil(id, automobil);
        else
            throw new HttpException('Niste autorizovani za ovu akciju', HttpStatus.FORBIDDEN);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('obrisi/:id')
    ObrisiAutomobil(@Request() req, @Param('id') id: string): Promise<any>{
        if(req.user.role===true)
            return this.automobilService.ObrisiAutomobil(id);
        else
            throw new HttpException('Niste autorizovani za ovu akciju', HttpStatus.FORBIDDEN);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    VratiAutomobil(@Request() req, @Param('id') id: string): Observable<Automobil>{
        if(req.user.role===true)
            return this.automobilService.VratiAutomobil(id);
        else
            throw new HttpException('Niste autorizovani za ovu akciju', HttpStatus.FORBIDDEN);
    }
}