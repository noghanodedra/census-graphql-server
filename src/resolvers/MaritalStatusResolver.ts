import { Resolver, Query, Mutation, Arg } from "type-graphql";

import { MaritalStatus } from "@entities/MaritalStatus";
import { CreateMaritalStatusInput } from "@inputs/CreateMaritalStatusInput";
import { UpdateMaritalStatusInput } from "@inputs/UpdateMaritalStatusInput";

@Resolver()
export class MaritalStatusResolver {
  @Query(() => [MaritalStatus])
  async maritalStatusList() {
    return MaritalStatus.find({
      order: {
        name: "ASC",
      },
    });
  }

  @Query(() => MaritalStatus)
  async maritalStatus(@Arg("id") id: string) {
    return MaritalStatus.findOne({ where: { id }, relations: ["individuals"] });
  }

  @Mutation(() => MaritalStatus)
  async createMaritalStatus(@Arg("data") data: CreateMaritalStatusInput) {
    const maritalStatus = MaritalStatus.create(data);
    await maritalStatus.save();
    return maritalStatus;
  }

  @Mutation(() => MaritalStatus)
  async updateMaritalStatus(
    @Arg("id") id: string,
    @Arg("data") data: UpdateMaritalStatusInput
  ) {
    const maritalStatus = await MaritalStatus.findOne({ where: { id } });
    if (!maritalStatus) throw new Error("MaritalStatus not found!");
    Object.assign(maritalStatus, data);
    await maritalStatus.save();
    return maritalStatus;
  }

  @Mutation(() => Boolean)
  async deleteMaritalStatus(@Arg("id") id: string) {
    const maritalStatus = await MaritalStatus.findOne({ where: { id } });
    if (!maritalStatus) throw new Error("MaritalStatus not found!");
    await maritalStatus.remove();
    return true;
  }
}
