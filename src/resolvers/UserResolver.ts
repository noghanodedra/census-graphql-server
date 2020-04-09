import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { getConnection } from "typeorm";
import { UserInputError } from "apollo-server";

import { sendRefreshToken } from "../auth/SendRefreshToken";
import { createRefreshToken, createAccessToken } from "../auth/AuthHelper";
import { MyContext } from "../auth/MyContext";
import { User } from "../entities/User";
import { CreateUserInput } from "../inputs/CreateUserInput";
import { UpdateUserInput } from "../inputs/UpdateUserInput";

const PASSWORD_HASH_SEED = 17;
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
  async userList() {
    return User.find();
  }

  @Query(() => UserProfile)
  async user(@Arg("id") id: string) {
    return User.findOne({ where: { id } });
  }

  @Mutation(() => UserProfile)
  async createUser(@Arg("data") data: CreateUserInput) {
    data.password = await hash(data.password, PASSWORD_HASH_SEED);
    const user = User.create(data);
    await user.save();
    return user as UserProfile;
  }

  @Mutation(() => UserProfile)
  async updateUser(@Arg("id") id: string, @Arg("data") data: UpdateUserInput) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      const inputError = { message: "User not found." };
      throw new UserInputError("Failed to update user due to input errors", {
        inputError,
      });
    }
    if (data.password) {
      data.password = await hash(data.password, PASSWORD_HASH_SEED);
    }
    Object.assign(user, data);
    await user.save();
    return user as UserProfile;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      const inputError = { message: "This is not a valid user id." };
      throw new UserInputError("Failed to delete user due to input errors", {
        inputError,
      });
    }
    await user.remove();
    return true;
  }

  @Mutation(() => Boolean)
  async logout(
    @Arg("accessToken") accessToken: string,
    @Ctx() { res }: MyContext
  ) {
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

  @Mutation(() => Boolean)
  async changePassword(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { res }: MyContext
  ) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const inputError = { message: "Could not find user." };
      throw new UserInputError(inputError.message, {
        inputError,
      });
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      const inputError = { message: "Invalid password." };
      throw new UserInputError(inputError.message, {
        inputError,
      });
    }
    if (!user.active) {
      const inputError = { message: "User is inactive." };
      throw new UserInputError(inputError.message, {
        inputError,
      });
    }
    const samePasswords = await compare(newPassword, user.password);
    if (samePasswords) {
      const inputError = {
        message: "Old password and new password can not be the same.",
      };
      throw new UserInputError(inputError.message, {
        inputError,
      });
    }
    if (newPassword && newPassword.length > 2) {
      const res = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set({ password: await hash(newPassword, PASSWORD_HASH_SEED) })
        .where("id = :id", { id: user.id })
        .execute();
      console.log("res", res);
      return true;
    }
    return false;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      const inputError = { message: "Could not find user." };
      throw new UserInputError("Request failure due to validation errors", {
        inputError,
      });
    }
    const valid = await compare(password, user.password);
    if (!valid) {
      const inputError = { message: "Invalid password." };
      throw new UserInputError("Request failure due to validation errors", {
        inputError,
      });
    }
    if (!user.active) {
      const inputError = { message: "User is inactive." };
      throw new UserInputError("Request failure due to validation errors", {
        inputError,
      });
    }
    sendRefreshToken(res, createRefreshToken(user));
    return {
      accessToken: createAccessToken(user),
      profile: user as UserProfile,
    };
  }
}
