import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { ObjectType, Field, ID, Int } from "type-graphql";

import { Education } from "./Education";
import { WorkClass } from "./WorkClass";
import { Occupation } from "./Occupation";
import { Relationship } from "./Relationship";
import { Caste } from "./Caste";
import { Gender } from "./Gender";
import { IncomeClass } from "./IncomeClass";
import { Family } from "./Family";
import { MaritalStatus } from "./MaritalStatus";

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

  @Field(() => Education)
  @ManyToOne(
    type => Education,
    education => education.individuals,
    { eager: true }
  )
  education: Education;

  @Field(() => WorkClass)
  @ManyToOne(
    type => WorkClass,
    workClass => workClass.individuals,
    { eager: true }
  )
  workClass: WorkClass;

  @Field(() => Occupation)
  @ManyToOne(
    type => Occupation,
    occupation => occupation.individuals,
    { eager: true }
  )
  occupation: Occupation;

  @Field(() => Relationship)
  @ManyToOne(
    type => Relationship,
    relationship => relationship.individuals,
    { eager: true }
  )
  relationship: Relationship;

  @Field(() => Caste)
  @ManyToOne(
    type => Caste,
    caste => caste.individuals,
    { eager: true }
  )
  caste: Caste;

  @Field(() => Gender)
  @ManyToOne(
    type => Gender,
    gender => gender.individuals,
    { eager: true }
  )
  gender: Gender;

  @Field(() => Family)
  @ManyToOne(
    type => Family,
    family => family.individuals,
    { eager: true }
  )
  family: Family;

  @Field(() => IncomeClass)
  @ManyToOne(
    type => IncomeClass,
    incomeClass => incomeClass.individuals,
    { eager: true }
  )
  incomeClass: IncomeClass;

  @Field(() => MaritalStatus)
  @ManyToOne(
    type => MaritalStatus,
    maritalStatus => maritalStatus.individuals,
    { eager: true }
  )
  maritalStatus: MaritalStatus;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @VersionColumn()
  version: number;
}
