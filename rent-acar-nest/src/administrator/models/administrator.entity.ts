import { Nalog } from "src/nalog/models/nalog.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Administrator extends Nalog{
    @Column({type: "varchar", length: 100})
    pozicija: string;
}