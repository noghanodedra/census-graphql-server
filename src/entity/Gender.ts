import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Individual } from "./Individual";

@Entity()
@ObjectType()
@Unique(["name"])
@Unique("UQ_NAMES", ["name"])
export class Gender extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({ nullable: true })
  description: string;

  @OneToMany(
    type => Individual,
    individual => individual.gender
  )
  individuals: Individual[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @VersionColumn()
  version: number;
}
