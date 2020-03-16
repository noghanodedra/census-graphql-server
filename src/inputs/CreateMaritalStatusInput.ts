import { InputType, Field } from "type-graphql";

@InputType()
export class CreateMaritalStatusInput {

    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;
    
}