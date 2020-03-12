import { InputType, Field } from "type-graphql";

@InputType()
export class CreateGenderInput {

    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;
    
}