import { InputType, Field } from "type-graphql";

@InputType()
export class CreateOccupationInput {

    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;
    
}