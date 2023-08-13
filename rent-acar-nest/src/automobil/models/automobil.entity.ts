import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Automobil{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 100})
    marka: string;
    @Column({type: "varchar", length: 100})
    model: string;
    @Column({type: "varchar", length: 1})
    broj_sedista: string;
    @Column({type: "varchar", length: 4})
    snaga_motora: string;
    @Column({type: "varchar", length: 20})
    gorivo: string;
    @Column({type: "boolean"})
    klima: boolean;
    @Column({type: "varchar", length: 20, unique: true})
    registracija: string;
    @Column({type: "varchar", length: 20})
    tip: string;
    @Column({type: "varchar", length: 20})
    transmisija: string;
    @Column({type: "varchar", length: 4})
    godiste: string;
    @Column({type: "integer"})
    dodatno_osiguranje: number;
    @Column({type: "integer"})
    cena: number;
    @Column({type: "varchar", length: 100})
    slika: string;
}