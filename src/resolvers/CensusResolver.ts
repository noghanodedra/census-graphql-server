import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Census } from "../entity/Census";
import { CreateCensusInput } from "../inputs/CreateCensusInput";
import { UpdateCensusInput } from "../inputs/UpdateCensusInput";

@Resolver()
export class CensusResolver {

    @Query(() => [Census])
    censusList() {
        return Census.find();
    }

    @Query(() => Census)
    census(@Arg("id") id: string) {
        return Census.findOne({ where: { id } });
    }

    @Mutation(() => Census)
    async createCensus(@Arg("data") data: CreateCensusInput) {
        const census = Census.create(data);
        await census.save();
        return census;
    }

    @Mutation(() => Census)
    async updateCensus(@Arg("id") id: string, @Arg("data") data: UpdateCensusInput) {
        const census = await Census.findOne({ where: { id } });
        if (!census) throw new Error("Census not found!");
        Object.assign(census, data);
        await census.save();
        return census;
    }

    @Mutation(() => Boolean)
    async deleteCensus(@Arg("id") id: string) {
        const census = await Census.findOne({ where: { id } });
        if (!census) throw new Error("Census not found!");
        await census.remove();
        return true;
    }
    
}