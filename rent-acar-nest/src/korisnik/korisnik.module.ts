import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Korisnik } from "./models/korisnik.entity";
import { KorisnikService } from "./service/korisnik.service";
import { KorisnikController } from "./controller/korisnik.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Korisnik])
    ],
    providers: [KorisnikService],
    controllers: [KorisnikController]
})
export class KorisnikModule {}