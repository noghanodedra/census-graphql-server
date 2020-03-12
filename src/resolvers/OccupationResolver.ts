import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Occupation } from "../entity/Occupation";
import { CreateOccupationInput } from "../inputs/CreateOccupationInput";
import { UpdateOccupationInput } from "../inputs/UpdateOccupationInput";

@Resolver()
export class OccupationResolver {

    @Query(() => [Occupation])
    occupationList() {
        return Occupation.find();
    }

    @Query(() => Occupation)
    occupation(@Arg("id") id: string) {
        return Occupation.findOne({ where: { id } });
    }

    @Mutation(() => Occupation)
    async createOccupation(@Arg("data") data: CreateOccupationInput) {
        const occupation = Occupation.create(data);
        await occupation.save();
        return occupation;
    }

    @Mutation(() => Occupation)
    async updateOccupation(@Arg("id") id: string, @Arg("data") data: UpdateOccupationInput) {
        const occupation = await Occupation.findOne({ where: { id } });
        if (!occupation) throw new Error("Occupation not found!");
        Object.assign(occupation, data);
        await occupation.save();
        return occupation;
    }

    @Mutation(() => Boolean)
    async deleteOccupation(@Arg("id") id: string) {
        const occupation = await Occupation.findOne({ where: { id } });
        if (!occupation) throw new Error("Occupation not found!");
        await occupation.remove();
        return true;
    }
    
}