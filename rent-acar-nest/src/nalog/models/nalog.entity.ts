import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Nalog{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 100, unique: true})
    email: string;
    @Column({type: "varchar", length: 50, nullable: true})
    sifra: string;
    @Column({type: "varchar", length: 50})
    ime: string;
    @Column({type: "varchar", length: 50})
    prezime: string;
    @Column({type: "varchar", length: 13, nullable: true})
    jmbg: string;
    @Column({type: "varchar", length: 50})
    drzava: string;
    @Column({type: "varchar", length: 100})
    grad: string;
    @Column({type: "varchar", length: 100})
    adresa: string;
    @Column({type: "varchar", length: 50})
    telefon: string;
}