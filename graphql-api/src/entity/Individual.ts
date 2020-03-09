import {Entity, PrimaryGeneratedColumn, Column, VersionColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import {Education} from './Education';
import {WorkClass} from './WorkClass';
import {Occupation} from './Occupation';
import {Relationship} from './Relationship';
import {Caste} from './Caste';
import {Sex} from './Sex';
import {IncomeClass} from './IncomeClass';
import {Family} from './Family';


@Entity()
export class Individual {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    educationYears: number;

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

    @ManyToOne(type => Sex, sex => sex.individuals)
    sex: Sex | null;

    @ManyToOne(type => Family, family => family.individuals)
    family: Family | null;
    
    @ManyToOne(type => IncomeClass, incomeClass => incomeClass.individuals)
    incomeClass: IncomeClass | null;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @VersionColumn()
    version: number;

}
