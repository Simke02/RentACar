import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rezervacija } from "./models/rezervacija.entity";
import { RezervacijaService } from "./service/rezervacija.service";
import { RezervacijaController } from "./controller/rezervacija.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Rezervacija])
    ],
    providers: [RezervacijaService],
    controllers: [RezervacijaController]
})
export class RezervacijaModule {}