import { Resolver, Query, Mutation, Arg } from "type-graphql";

import { Individual } from "@entities/Individual";
import { CreateIndividualInput } from "@inputs/CreateIndividualInput";
import { UpdateIndividualInput } from "@inputs/UpdateIndividualInput";
import { Family } from "@entities/Family";
import { Education } from "@entities/Education";
import { WorkClass } from "@entities/WorkClass";
import { Occupation } from "@entities/Occupation";
import { Relationship } from "@entities/Relationship";
import { Caste } from "@entities/Caste";
import { Gender } from "@entities/Gender";
import { IncomeClass } from "@entities/IncomeClass";
import { MaritalStatus } from "@entities/MaritalStatus";

@Resolver()
export class IndividualResolver {
  @Query(() => [Individual])
  individualList() {
    return Individual.find({
      order: {
        name: "ASC",
      },
      relations: ["state"]
    });
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
    const family = await Family.findOne({
      where: { id: data.familyId }
    });
    const education = await Education.findOne({
      where: { id: data.educationId }
    });
    const workClass = await WorkClass.findOne({
      where: { id: data.workClassId }
    });
    const occupation = await Occupation.findOne({
      where: { id: data.occupationId }
    });
    const relationship = await Relationship.findOne({
      where: { id: data.relationshipId }
    });
    const caste = await Caste.findOne({
      where: { id: data.casteId }
    });
    const gender = await Gender.findOne({
      where: { id: data.genderId }
    });
    const incomeClass = await IncomeClass.findOne({
      where: { id: data.incomeClassId }
    });
    const maritalStatus = await MaritalStatus.findOne({
      where: { id: data.maritalStatusId }
    });
    const individual = Individual.create(data);
    if (family) individual.family = family;
    if (education) individual.education = education;
    if (workClass) individual.workClass = workClass;
    if (incomeClass) individual.incomeClass = incomeClass;
    if (maritalStatus) individual.maritalStatus = maritalStatus;
    if (gender) individual.gender = gender;
    if (caste) individual.caste = caste;
    if (relationship) individual.relationship = relationship;
    if (occupation) individual.occupation = occupation;
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
