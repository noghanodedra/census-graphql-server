import { Resolver, Query, Mutation, Arg } from "type-graphql";

import { Relationship } from "@entities/Relationship";
import { CreateRelationshipInput } from "@inputs/CreateRelationshipInput";
import { UpdateRelationshipInput } from "@inputs/UpdateRelationshipInput";

@Resolver()
export class RelationshipResolver {
  @Query(() => [Relationship])
  relationshipList() {
    return Relationship.find();
  }

  @Query(() => Relationship)
  relationship(@Arg("id") id: string) {
    return Relationship.findOne({
      where: { id },
      relations: ["individuals"]
    });
  }

  @Mutation(() => Relationship)
  async createRelationship(@Arg("data") data: CreateRelationshipInput) {
    const relationship = Relationship.create(data);
    await relationship.save();
    return relationship;
  }

  @Mutation(() => Relationship)
  async updateRelationship(
    @Arg("id") id: string,
    @Arg("data") data: UpdateRelationshipInput
  ) {
    const relationship = await Relationship.findOne({ where: { id } });
    if (!relationship) throw new Error("Relationship not found!");
    Object.assign(relationship, data);
    await relationship.save();
    return relationship;
  }

  @Mutation(() => Boolean)
  async deleteRelationship(@Arg("id") id: string) {
    const relationship = await Relationship.findOne({ where: { id } });
    if (!relationship) throw new Error("Relationship not found!");
    await relationship.remove();
    return true;
  }
}
