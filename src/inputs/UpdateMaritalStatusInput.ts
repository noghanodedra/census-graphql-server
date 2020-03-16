import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateMaritalStatusInput {
    
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

}