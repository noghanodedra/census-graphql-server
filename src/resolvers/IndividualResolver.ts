import { Resolver, Query, Mutation, Arg } from "type-graphql";

import { Individual } from "../entity/Individual";
import { CreateIndividualInput } from "../inputs/CreateIndividualInput";
import { UpdateIndividualInput } from "../inputs/UpdateIndividualInput";

@Resolver()
export class IndividualResolver {
  @Query(() => [Individual])
  individualList() {
    return Individual.find();
  }

  @Query(() => Individual)
  individual(@Arg("id") id: string) {
    return Individual.findOne({
      where: { id },
      relations: [
        "education",
        "workClass",
        "occupation",
        "relationship",
        "caste",
        "incomeClass",
        "family",
        "gender",
        "maritalStatus"
      ]
    });
  }

  @Mutation(() => Individual)
  async createIndividual(@Arg("data") data: CreateIndividualInput) {
    const individual = Individual.create(data);
    await individual.save();
    return individual;
  }

  @Mutation(() => Individual)
  async updateIndividual(
    @Arg("id") id: string,
    @Arg("data") data: UpdateIndividualInput
  ) {
    const individual = await Individual.findOne({ where: { id } });
    if (!individual) throw new Error("Individual not found!");
    Object.assign(individual, data);
    await individual.save();
    return individual;
  }

  @Mutation(() => Boolean)
  async deleteIndividual(@Arg("id") id: string) {
    const individual = await Individual.findOne({ where: { id } });
    if (!individual) throw new Error("Individual not found!");
    await individual.remove();
    return true;
  }
}
