import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Individual } from './Individual';
import { Census } from './Census';
import { Address } from './Address';


@Entity()
export class Family {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    headName: string;

    @OneToOne(type => Address, address => address.family)
    @JoinColumn()
    address: Address;

    @ManyToOne(type => Census, census => census.families)
    census: Census;

    @OneToMany(type => Individual, individual => individual.family)
    individuals: Individual[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;

}
