import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUserInput {

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field()
    active?: boolean;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    password?: string;

    @Field()
    lastLoggedIn?: Date;

    @Field()
    isAdmin?: boolean;

}