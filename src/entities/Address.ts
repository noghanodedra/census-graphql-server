import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  VersionColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

import { Family } from "./Family";

@Entity()
@ObjectType()
export class Address extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  line1: string;

  @Field(() => String)
  @Column({ nullable: true })
  line2?: string;

  @Field(() => String)
  @Column({ nullable: true })
  line3?: string;

  @Field(() => String)
  @Column()
  postcode: string;

  @Field(() => String)
  @Column()
  townCity: string;

  @Field(() => String)
  @Column()
  district: string;

  @Field(() => String)
  @Column()
  state: string;

  @OneToOne((type) => Family, (family) => family.address)
  family: Family;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @VersionColumn()
  version: number;
}
