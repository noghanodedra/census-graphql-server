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

}