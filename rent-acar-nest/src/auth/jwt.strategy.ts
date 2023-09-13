import { Injectable } from "@nestjs/common";
import { JwtSecretRequestType } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AdministratorService } from "src/administrator/service/administrator.service";
import { KorisnikService } from "src/korisnik/service/korisnik.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private korisnikService: KorisnikService,
                private administratorService: AdministratorService){
        console.log("jwt-strategy");
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SECRET'
        })
    }

    async validate(payload: any) {
        let nalog: any;
        if(payload.role)
            nalog = await this.administratorService.VratiAdministratora(payload.email);
        else
            nalog = await this.korisnikService.VratiKorisnika(payload.email);
        
        console.log(payload);
        return {nalog, role: payload.role};
    }
}