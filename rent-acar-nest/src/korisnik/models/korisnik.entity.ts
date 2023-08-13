import { Nalog } from "src/nalog/models/nalog.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Korisnik extends Nalog{
    @Column({type: "varchar", length: 20, nullable: true})
    broj_pasosa: string;
    @Column({type: "varchar", length: 20})
    broj_vozacke: string;
}