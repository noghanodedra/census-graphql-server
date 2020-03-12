import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { IncomeClass } from "../entity/IncomeClass";
import { CreateIncomeClassInput } from "../inputs/CreateIncomeClassInput";
import { UpdateIncomeClassInput } from "../inputs/UpdateIncomeClassInput";

@Resolver()
export class IncomeClassResolver {

    @Query(() => [IncomeClass])
    incomeClassList() {
        return IncomeClass.find();
    }

    @Query(() => IncomeClass)
    incomeClass(@Arg("id") id: string) {
        return IncomeClass.findOne({ where: { id } });
    }

    @Mutation(() => IncomeClass)
    async createIncomeClass(@Arg("data") data: CreateIncomeClassInput) {
        const incomeClass = IncomeClass.create(data);
        await incomeClass.save();
        return incomeClass;
    }

    @Mutation(() => IncomeClass)
    async updateIncomeClass(@Arg("id") id: string, @Arg("data") data: UpdateIncomeClassInput) {
        const incomeClass = await IncomeClass.findOne({ where: { id } });
        if (!incomeClass) throw new Error("IncomeClass not found!");
        Object.assign(incomeClass, data);
        await incomeClass.save();
        return incomeClass;
    }

    @Mutation(() => Boolean)
    async deleteIncomeClass(@Arg("id") id: string) {
        const incomeClass = await IncomeClass.findOne({ where: { id } });
        if (!incomeClass) throw new Error("IncomeClass not found!");
        await incomeClass.remove();
        return true;
    }
    
}