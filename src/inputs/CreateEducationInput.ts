import { InputType, Field } from "type-graphql";

@InputType()
export class CreateEducationInput {

    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;
    
}