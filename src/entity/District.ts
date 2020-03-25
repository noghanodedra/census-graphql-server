import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { State } from "./State";

@Entity()
@ObjectType()
export class District extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @ManyToOne(
    type => State,
    state => state.districts
  )
  state: State | null;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @VersionColumn()
  version: number;
}
