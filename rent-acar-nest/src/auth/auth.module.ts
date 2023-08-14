import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { KorisnikModule } from "src/korisnik/korisnik.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [JwtModule.register({
        secret: 'SECRET', //ovo moras da stavis nesto bezbedno
        signOptions: {expiresIn: '60s'}
    }),
    KorisnikModule,
    PassportModule
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}