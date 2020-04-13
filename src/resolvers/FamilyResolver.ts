import { Resolver, Query, Mutation, Arg } from "type-graphql";

import { Family } from "../entities/Family";
import { Address } from "../entities/Address";
import { Census } from "../entities/Census";
import { CreateFamilyInput } from "../inputs/CreateFamilyInput";
import { UpdateFamilyInput } from "../inputs/UpdateFamilyInput";

@Resolver()
export class FamilyResolver {
  @Query(() => [Family])
  familyList() {
    return Family.find();
  }

  @Query(() => Family)
  family(@Arg("id") id: string) {
    return Family.findOne({
      where: { id },
      relations: ["individuals", "census", "address"],
    });
  }

  @Mutation(() => Family)
  async createFamily(@Arg("data") data: CreateFamilyInput) {
    let address = null;
    if (data.address) {
      address = Address.create(data.address);
      await address.save();
      delete data.address;
    }
    const census = await Census.findOne({
      where: { id: data.censusId },
    });
    const family = Family.create(data);
    if (address) family.address = address;
    if (census) family.census = census;
    await family.save();
    return family;
  }

  @Mutation(() => Family)
  async updateFamily(
    @Arg("id") id: string,
    @Arg("data") data: UpdateFamilyInput
  ) {
    const family = await Family.findOne({ where: { id } });
    if (!family) throw new Error("Family not found!");
    Object.assign(family, data);
    await family.save();
    return family;
  }

  @Mutation(() => Boolean)
  async deleteFamily(@Arg("id") id: string) {
    const family = await Family.findOne({ where: { id } });
    if (!family) throw new Error("Family not found!");
    await family.remove();
    return true;
  }
}
