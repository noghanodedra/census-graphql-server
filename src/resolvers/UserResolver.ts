import {
    Resolver,
    Query,
    Mutation,
    Arg,
    ObjectType,
    Field,
    Ctx,
    UseMiddleware,
    Int
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { getConnection } from "typeorm";
import { UserInputError } from 'apollo-server';
import { sendRefreshToken } from "../auth/SendRefreshToken";
import { createRefreshToken, createAccessToken } from "../auth/AuthHelper";
import { MyContext } from "../auth/MyContext";
import { User } from "../entity/User";
import { CreateUserInput } from "../inputs/CreateUserInput";
import { UpdateUserInput } from "../inputs/UpdateUserInput";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => UserProfile)
    profile: UserProfile;
}

@ObjectType()
class UserProfile {

    @Field()
    id: number;

    @Field(() => String)
    firstName: string;

    @Field(() => String)
    lastName: string;

    @Field(() => Boolean)
    active: boolean;

    @Field(() => String)
    email: string;

    @Field()
    lastLoggedIn: Date;

    @Field(() => Boolean)
    isAdmin: boolean;

}

@Resolver()
export class UserResolver {

    @Query(() => [UserProfile])
    userList() {
        return User.find();
    }

    @Query(() => UserProfile)
    user(@Arg("id") id: string) {
        return User.findOne({ where: { id } });
    }

    @Mutation(() => UserProfile)
    async createUser(@Arg("data") data: CreateUserInput) {
        data.password = await hash(data.password, 17);
        const user = User.create(data);
        await user.save();
        return user as UserProfile;
    }

    @Mutation(() => UserProfile)
    async updateUser(@Arg("id") id: string, @Arg("data") data: UpdateUserInput) {
        const user = await User.findOne({ where: { id } });
        if (!user){
            const inputErrors = {id: "User not found."};
            throw new UserInputError(
                'Failed to update user due to input errors',
                { inputErrors }
            );
        }
        if(data.password) {
            data.password = await hash(data.password, 17);
        }
        Object.assign(user, data);
        await user.save();
        return user as UserProfile;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id: string) {
        const user = await User.findOne({ where: { id } });
        if (!user){
            const inputErrors = {id: "This is not a valid user id."};
            throw new UserInputError(
                'Failed to delete user due to input errors',
                { inputErrors }
            );
        }
        await user.remove();
        return true;
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res }: MyContext) {
        sendRefreshToken(res, "");
        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
        await getConnection()
        .getRepository(User)
        .increment({ id: userId }, "tokenVersion", 1);
        return true;
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res }: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const inputErrors = {email: "could not find user."};
            throw new UserInputError(
                'Failed to login due to validation errors',
                { inputErrors }
            );
        }
        const valid = await compare(password, user.password);
        if (!valid) {
            const inputErrors = {password: "Invalid password."};
            throw new UserInputError(
                'Failed to login due to validation errors',
                { inputErrors }
            );
        }

        // login successful
        console.log(res);
        sendRefreshToken(res, createRefreshToken(user));
        return {
            accessToken: createAccessToken(user),
            profile: user as UserProfile
        };
    }

}