import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Caste } from "../entity/Caste";
import { CreateCasteInput } from "../inputs/CreateCasteInput";
import { UpdateCasteInput } from "../inputs/UpdateCasteInput";

@Resolver()
export class CasteResolver {
  @Query(() => [Caste])
  casteList() {
    return Caste.find();
  }

  @Query(() => Caste)
  caste(@Arg("id") id: string) {
    return Caste.findOne({ where: { id }, relations: ["individuals"] });
  }

  @Mutation(() => Caste)
  async createCaste(@Arg("data") data: CreateCasteInput) {
    const caste = Caste.create(data);
    await caste.save();
    return caste;
  }

  @Mutation(() => Caste)
  async updateCaste(
    @Arg("id") id: string,
    @Arg("data") data: UpdateCasteInput
  ) {
    const caste = await Caste.findOne({ where: { id } });
    if (!caste) throw new Error("Caste not found!");
    Object.assign(caste, data);
    await caste.save();
    return caste;
  }

  @Mutation(() => Boolean)
  async deleteCaste(@Arg("id") id: string) {
    const caste = await Caste.findOne({ where: { id } });
    if (!caste) throw new Error("Caste not found!");
    await caste.remove();
    return true;
  }
}
