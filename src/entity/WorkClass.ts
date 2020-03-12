import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import {Individual} from './Individual';

@Entity()
@ObjectType()
export class WorkClass extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column({ nullable: true })
    description: string;

    @Field(() => [Individual])
    @OneToMany(type => Individual, individual => individual.workClass)
    individuals: Individual[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;
}
