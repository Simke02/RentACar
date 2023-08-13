import { Automobil } from "src/automobil/models/automobil.entity";
import { Korisnik } from "src/korisnik/models/korisnik.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rezervacija{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "integer"})
    ukupna_cena: number;
    @Column({type: "timestamp"})
    vreme_izdavanja: Date;
    @Column({type: "timestamp"})
    vreme_vracanja: Date;
    @Column({type: "boolean"})
    dodatno_osiguranje: boolean;
    @ManyToOne(() => Korisnik)
    korisnik: Korisnik;
    @ManyToOne(() => Automobil)
    automobil: Automobil;
}