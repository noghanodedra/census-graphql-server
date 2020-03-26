import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Unique
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import { District } from "./District";

@Entity()
@ObjectType()
@Unique(["name"])
@Unique("UQ_NAMES", ["name"])
export class State extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  code: string;

  @Field(() => [District])
  @OneToMany(
    type => District,
    district => district.state
  )
  districts: District[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @VersionColumn()
  version: number;
}
