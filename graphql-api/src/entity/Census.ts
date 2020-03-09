import {Entity, PrimaryGeneratedColumn, Column, VersionColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Family } from './Family';

@Entity()
export class Census {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(type => Family, family => family.census)
    families: Family[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;
    
}
