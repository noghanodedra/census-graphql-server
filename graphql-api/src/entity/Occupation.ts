import {Entity, PrimaryGeneratedColumn, Column, OneToMany, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import {Individual} from './Individual';

@Entity()
export class Occupation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(type => Individual, individual => individual.occupation)
    individuals: Individual[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;
}
