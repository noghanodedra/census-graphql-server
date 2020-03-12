import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Education } from "../entity/Education";
import { CreateEducationInput } from "../inputs/CreateEducationInput";
import { UpdateEducationInput } from "../inputs/UpdateEducationInput";

@Resolver()
export class EducationResolver {

    @Query(() => [Education])
    educationList() {
        return Education.find();
    }

    @Query(() => Education)
    education(@Arg("id") id: string) {
        return Education.findOne({ where: { id } });
    }

    @Mutation(() => Education)
    async createEducation(@Arg("data") data: CreateEducationInput) {
        const education = Education.create(data);
        await education.save();
        return education;
    }

    @Mutation(() => Education)
    async updateEducation(@Arg("id") id: string, @Arg("data") data: UpdateEducationInput) {
        const education = await Education.findOne({ where: { id } });
        if (!education) throw new Error("Education not found!");
        Object.assign(education, data);
        await education.save();
        return education;
    }

    @Mutation(() => Boolean)
    async deleteEducation(@Arg("id") id: string) {
        const education = await Education.findOne({ where: { id } });
        if (!education) throw new Error("Education not found!");
        await education.remove();
        return true;
    }
    
}