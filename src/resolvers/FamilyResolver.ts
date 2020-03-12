import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Family } from "../entity/Family";
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
        return Family.findOne({ where: { id } });
    }

    @Mutation(() => Family)
    async createFamily(@Arg("data") data: CreateFamilyInput) {
        const family = Family.create(data);
        await family.save();
        return family;
    }

    @Mutation(() => Family)
    async updateFamily(@Arg("id") id: string, @Arg("data") data: UpdateFamilyInput) {
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