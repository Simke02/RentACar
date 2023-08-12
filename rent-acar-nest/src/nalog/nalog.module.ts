import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Nalog } from "./models/nalog.entity";
import { NalogService } from "./service/nalog.service";
import { NalogController } from "./controller/nalog.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Nalog])
    ],
    providers: [NalogService],
    controllers: [NalogController]
})
export class NalogModule {}