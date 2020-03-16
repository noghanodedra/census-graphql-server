import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUserInput {

    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    active?: boolean;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    password?: string;

    @Field({ nullable: true })
    lastLoggedIn?: Date;

    @Field({ nullable: true })
    isAdmin?: boolean;

    @Field({ nullable: true })
    tokenVersion?: number;
    
}