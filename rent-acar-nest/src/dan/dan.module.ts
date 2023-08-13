import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dan } from "./models/dan.entity";
import { DanController } from "./controller/dan.controller";
import { DanService } from "./service/dan.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Dan])
    ],
    providers: [DanService],
    controllers: [DanController]
})
export class DanModule {}