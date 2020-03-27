import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CreateIndividualInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => Int)
  educationYears: number;

  @Field(() => Int)
  hoursPerWeek: number;

  @Field(() => Int)
  educationId: number;

  @Field(() => Int)
  workClassId: number;

  @Field(() => Int)
  occupationId: number;

  @Field(() => Int)
  relationshipId: number;

  @Field(() => Int)
  casteId: number;

  @Field(() => Int)
  genderId: number;

  @Field(() => Int)
  familyId: number;

  @Field(() => Int)
  incomeClassId: number;

  @Field(() => Int)
  maritalStatusId: number;
}
