import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { District } from "@entities/District";
import { CreateDistrictInput } from "@inputs/CreateDistrictInput";
import { UpdateDistrictInput } from "@inputs/UpdateDistrictInput";
import { State } from "@entities/State";

@Resolver()
export class DistrictResolver {
  @Query(() => [District])
  districtList() {
    return District.find({
      order: {
        name: "ASC",
      },
      relations: ["state"],
    });
  }

  @Query(() => District)
  district(@Arg("id") id: string) {
    return District.findOne({ where: { id } });
  }

  @Mutation(() => District)
  async createDistrict(@Arg("data") data: CreateDistrictInput) {
    const state = await State.findOne({
       where: { id: data.stateId },
    });
    const district = District.create(data);
    if (state) district.state = state;
    await district.save();
    return district;
  }

  @Mutation(() => District)
  async updateDistrict(
    @Arg("id") id: string,
    @Arg("data") data: UpdateDistrictInput
  ) {
    const district = await District.findOne({ where: { id } });
    if (!district) throw new Error("District not found!");
    Object.assign(district, data);
    const state = await State.findOne({
       where: { id: data.stateId },
    });
    if (state) district.state = state;
    await district.save();
    return district;
  }

  @Mutation(() => Boolean)
  async deleteDistrict(@Arg("id") id: string) {
    const district = await District.findOne({ where: { id } });
    if (!district) throw new Error("District not found!");
    await district.remove();
    return true;
  }
}
