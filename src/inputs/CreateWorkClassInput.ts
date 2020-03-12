import { InputType, Field } from "type-graphql";

@InputType()
export class CreateWorkClassInput {

    @Field(() => String)
    name: string;

    @Field(() => String)
    description: string;
    
}