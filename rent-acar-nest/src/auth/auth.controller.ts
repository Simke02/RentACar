import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Body('email') email: string, @Body('sifra') sifra: string/*@Request() req*/) {
        //return this.authService.login(req.korisnik);
        //return req.korisnik;
        //return "Pusi kurac";
        return this.authService.ValidirajKorisnika(email, sifra);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('korisnik')
    getProfile(@Request() req) {
      return req.korisnik;
    }
}