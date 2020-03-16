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

import { sendRefreshToken } from "../auth/sendRefreshToken";
import { createRefreshToken, createAccessToken } from "../auth/authHelper";
import { MyContext } from "../auth/MyContext";
import { User } from "../entity/User";
import { CreateUserInput } from "../inputs/CreateUserInput";
import { UpdateUserInput } from "../inputs/UpdateUserInput";

@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
    @Field(() => User)
    user: User;
}

@Resolver()
export class UserResolver {

    @Query(() => [User])
    userList() {
        return User.find();
    }

    @Query(() => User)
    user(@Arg("id") id: string) {
        return User.findOne({ where: { id } });
    }

    @Mutation(() => User)
    async createUser(@Arg("data") data: CreateUserInput) {
        data.password = await hash(data.password, 17);
        const user = User.create(data);
        await user.save();
        return user;
    }

    @Mutation(() => User)
    async updateUser(@Arg("id") id: string, @Arg("data") data: UpdateUserInput) {
        const user = await User.findOne({ where: { id } });
        if (!user) throw new Error("User not found!");
        if(data.password) {
           data.password = await hash(data.password, 17);
        }
        Object.assign(user, data);
        await user.save();
        return user;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id") id: string) {
        const user = await User.findOne({ where: { id } });
        if (!user) throw new Error("User not found!");
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
            throw new Error("could not find user");
        }

        const valid = await compare(password, user.password);

        if (!valid) {
            throw new Error("bad password");
        }

        // login successful
        console.log(res);
        sendRefreshToken(res, createRefreshToken(user));

        return {
            accessToken: createAccessToken(user),
            user
        };
    }

}