import { Automobil } from "src/automobil/models/automobil.entity";
import { Kalendar } from "src/kalendar/models/kalendar.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Dan{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    vreme: string;
    @Column({type: "boolean"})
    izdavanje: boolean;
    @ManyToOne(() => Automobil)
    automobil: Automobil;
    @ManyToOne(() => Kalendar)
    kalendar: Kalendar;
}