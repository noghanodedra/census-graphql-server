import {Entity, PrimaryGeneratedColumn, Column, Index, VersionColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
@Index(["email"], { unique: true })
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: false })
    active: boolean;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'timestamp'})
    lastLoggedIn: Date;

    @Column({ default: false })
    isAdmin: boolean;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;
}
