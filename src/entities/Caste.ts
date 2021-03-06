import {
  Entity,
  Unique,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import { Individual } from "./Individual";

@Entity()
@ObjectType()
@Unique(["name"])
export class Caste extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  religion: string;

  @Field(() => String)
  @Column({ nullable: true })
  description: string;

  @Field(() => Boolean)
  @Column({ default: false })
  minority: boolean;

  @OneToMany((type) => Individual, (individual) => individual.caste, {
    onDelete: "CASCADE",
  })
  individuals: Individual[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @VersionColumn()
  version: number;
}
