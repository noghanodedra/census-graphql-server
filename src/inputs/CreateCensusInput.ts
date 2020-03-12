import { InputType, Field } from "type-graphql";

@InputType()
export class CreateCensusInput {

    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;
    
}