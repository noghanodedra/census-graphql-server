import { Resolver, Query, Mutation, Arg } from "type-graphql";

import { Gender } from "@entities/Gender";
import { CreateGenderInput } from "@inputs/CreateGenderInput";
import { UpdateGenderInput } from "@inputs/UpdateGenderInput";

@Resolver()
export class GenderResolver {
  @Query(() => [Gender])
  genderList() {
    return Gender.find();
  }

  @Query(() => Gender)
  gender(@Arg("id") id: string) {
    return Gender.findOne({ where: { id }, relations: ["individuals"] });
  }

  @Mutation(() => Gender)
  async createGender(@Arg("data") data: CreateGenderInput) {
    const gender = Gender.create(data);
    await gender.save();
    return gender;
  }

  @Mutation(() => Gender)
  async updateGender(
    @Arg("id") id: string,
    @Arg("data") data: UpdateGenderInput
  ) {
    const gender = await Gender.findOne({ where: { id } });
    if (!gender) throw new Error("Gender not found!");
    Object.assign(gender, data);
    await gender.save();
    return gender;
  }

  @Mutation(() => Boolean)
  async deleteGender(@Arg("id") id: string) {
    const gender = await Gender.findOne({ where: { id } });
    if (!gender) throw new Error("Gender not found!");
    await gender.remove();
    return true;
  }
}
