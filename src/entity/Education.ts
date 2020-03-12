import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, VersionColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Individual } from './Individual';

@Entity()
@ObjectType()
export class Education extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => String)
    @Column({ nullable: true })
    description: string;

    @OneToMany(type => Individual, individual => individual.education)
    individuals: Individual[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;
    
}
