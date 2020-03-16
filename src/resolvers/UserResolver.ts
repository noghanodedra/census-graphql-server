import { Resolver, ObjectType, Query, Field, Mutation, Arg } from "type-graphql";
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

import { User } from "../entity/User";
import { CreateUserInput } from "../inputs/CreateUserInput";
import { UpdateUserInput } from "../inputs/UpdateUserInput";


@ObjectType()
class LoginResponse {
    @Field()
    accessToken: string;
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
        const user = User.create(data);
        await user.save();
        return user;
    }

    @Mutation(() => User)
    async updateUser(@Arg("id") id: string, @Arg("data") data: UpdateUserInput) {
        const user = await User.findOne({ where: { id } });
        if (!user) throw new Error("User not found!");
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
    
    @Mutation(() => LoginResponse)
    async login(@Arg("email") email: string, @Arg("password") password: string) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
        throw new Error("Could not find user");
        }

        const verify = await compare(password, user.password);

        if (!verify) {
        throw new Error("Bad password");
        }

        return {
        accessToken: sign({ userId: user.id }, "MySecretKey", {
            expiresIn: "15m"
        })
    };

}