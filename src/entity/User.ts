import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, Index, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
@Index(["email"], { unique: true })
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    firstName: string;

    @Field(() => String)
    @Column()
    lastName: string;

    @Field(() => Boolean)
    @Column({ default: false })
    active: boolean;

    @Field(() => String)
    @Column()
    email: string;

    @Field(() => String)
    @Column()
    password: string;

    @Field()
    @Column({ type: 'timestamp'})
    lastLoggedIn: Date;

    @Field(() => Boolean)
    @Column({ default: false })
    isAdmin: boolean;

    @Field(() => Number)
    @Column("int", { default: 0 })
    tokenVersion: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;
    
}
