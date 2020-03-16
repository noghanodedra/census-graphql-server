import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, VersionColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Education } from './Education';
import { WorkClass } from './WorkClass';
import { Occupation } from './Occupation';
import { Relationship } from './Relationship';
import { Caste } from './Caste';
import { Gender } from './Gender';
import { IncomeClass } from './IncomeClass';
import { Family } from './Family';
import { MaritalStatus } from './MaritalStatus';

@Entity()
@ObjectType()
export class Individual extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => Int)
    @Column()
    age: number;

    @Field(() => Int)
    @Column()
    educationYears: number;

    @Field(() => Int)
    @Column()
    hoursPerWeek: number;

    @ManyToOne(type => Education, education => education.individuals)
    education: Education | null;

    @ManyToOne(type => WorkClass, workClass => workClass.individuals)
    workClass: WorkClass | null;

    @ManyToOne(type => Occupation, occupation => occupation.individuals)
    occupation:  Occupation | null;
    
    @ManyToOne(type => Relationship, relationship => relationship.individuals)
    relationship: Relationship | null;

    @ManyToOne(type => Caste, caste => caste.individuals)
    caste: Caste | null;

    @ManyToOne(type => Gender, gender => gender.individuals)
    gender: Gender | null;

    @ManyToOne(type => Family, family => family.individuals)
    family: Family | null;
    
    @ManyToOne(type => IncomeClass, incomeClass => incomeClass.individuals)
    incomeClass: IncomeClass | null;

    @ManyToOne(type => MaritalStatus, maritalStatus => maritalStatus.individuals)
    maritalStatus: MaritalStatus | null;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;

}
