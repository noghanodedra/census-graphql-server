import { InputType, Field } from "type-graphql";

@InputType()
export class CreateAddressInput {
    
    @Field()
    line1: string;

    @Field()
    line2: string;

    @Field()
    region: string;

    @Field()
    townCity: string;

    @Field()
    district: string;

    @Field()
    state: string;

}