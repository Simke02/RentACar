import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KalendarService } from "./service/kalendar.service";
import { Kalendar } from "./models/kalendar.entity";
import { KalendarController } from "./controller/kalendar.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Kalendar])
    ],
    providers: [KalendarService],
    controllers: [KalendarController]
})
export class KalendarModule {}