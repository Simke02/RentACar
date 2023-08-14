import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { KorisnikService } from "src/korisnik/service/korisnik.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private korisnikService: KorisnikService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET'
        })
    }

    async validate(payload: any) {
        const korisnik = await this.korisnikService.VratiKorisnika(payload.name);
        return korisnik;
    }
}