import { InputType, Field } from "type-graphql";

@InputType()
export class CreateUserInput {

    @Field(() => String)
    firstName: string;

    @Field(() => String)
    lastName: string;

    @Field(() => Boolean)
    active: boolean;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field()
    lastLoggedIn: Date;

    @Field(() => Boolean)
    isAdmin: boolean;

}