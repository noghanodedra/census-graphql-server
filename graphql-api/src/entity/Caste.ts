import {Entity, PrimaryGeneratedColumn, Column, OneToMany, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import {Individual} from './Individual';

@Entity()
export class Caste {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    religion: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: false })
    minority: boolean;

    @OneToMany(type => Individual, individual => individual.caste)
    individuals: Individual[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;

}
