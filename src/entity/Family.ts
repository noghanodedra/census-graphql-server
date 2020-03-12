import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Individual } from './Individual';
import { Census } from './Census';
import { Address } from './Address';

@Entity()
@ObjectType()
export class Family extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
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
