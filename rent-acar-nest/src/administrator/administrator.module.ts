import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Administrator } from "./models/administrator.entity";
import { AdministratorService } from "./service/administrator.service";
import { AdministratorController } from "./controller/administrator.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Administrator])
    ],
    providers: [AdministratorService],
    controllers: [AdministratorController]
})
export class AdministratorModule {}