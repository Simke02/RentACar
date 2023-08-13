import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Automobil } from "./models/automobil.entity";
import { AutomobilService } from "./service/automobil.service";
import { AutomobilController } from "./controller/automobil.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Automobil])
    ],
    providers: [AutomobilService],
    controllers: [AutomobilController]
})
export class AutomobilModule {}