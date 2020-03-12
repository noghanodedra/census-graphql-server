import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Individual } from './Individual';

@Entity()
@ObjectType()
export class IncomeClass extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column({ nullable: true })
    description: string;

    @OneToMany(type => Individual, individual => individual.gender)
    individuals: Individual[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;
    
}
