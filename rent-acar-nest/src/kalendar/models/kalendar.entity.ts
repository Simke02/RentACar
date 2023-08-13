import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Kalendar{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "timestamp"})
    datum: Date;
}