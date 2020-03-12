import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, VersionColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Family } from './Family';

@Entity()
@ObjectType()
export class Census extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
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
