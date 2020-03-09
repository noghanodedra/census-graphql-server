import {Entity, PrimaryGeneratedColumn, Column, OneToMany, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import {Individual} from './Individual';

@Entity()
export class WorkClass {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(type => Individual, individual => individual.workClass)
    individuals: Individual[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;
}
