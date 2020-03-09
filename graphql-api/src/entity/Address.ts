import {Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, Column, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import {Family} from './Family';

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    line1: string;

    @Column({ nullable: true })
    line2: string;

    @Column()
    region: string;

    @Column()
    townCity: string;

    @Column()
    district: string;

    @Column()
    state: string;

    @OneToOne(type => Family, family => family.address)
    @JoinColumn()
    family: Family;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;
    
}
