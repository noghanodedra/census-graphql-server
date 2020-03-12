import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { WorkClass } from "../entity/WorkClass";
import { CreateWorkClassInput } from "../inputs/CreateWorkClassInput";
import { UpdateWorkClassInput } from "../inputs/UpdateWorkClassInput";

@Resolver()
export class WorkClassResolver {

    @Query(() => [WorkClass])
    workClassList() {
        return WorkClass.find();
    }

    @Query(() => WorkClass)
    workClass(@Arg("id") id: string) {
        return WorkClass.findOne({ where: { id } });
    }

    @Mutation(() => WorkClass)
    async createWorkClass(@Arg("data") data: CreateWorkClassInput) {
        const workClass = WorkClass.create(data);
        await workClass.save();
        return workClass;
    }

    @Mutation(() => WorkClass)
    async updateWorkClass(@Arg("id") id: string, @Arg("data") data: UpdateWorkClassInput) {
        const workClass = await WorkClass.findOne({ where: { id } });
        if (!workClass) throw new Error("WorkClass not found!");
        Object.assign(workClass, data);
        await workClass.save();
        return workClass;
    }

    @Mutation(() => Boolean)
    async deleteWorkClass(@Arg("id") id: string) {
        const workClass = await WorkClass.findOne({ where: { id } });
        if (!workClass) throw new Error("WorkClass not found!");
        await workClass.remove();
        return true;
    }
    
}