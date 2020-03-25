import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { District } from "../entity/District";
import { CreateDistrictInput } from "../inputs/CreateDistrictInput";
import { UpdateDistrictInput } from "../inputs/UpdateDistrictInput";

@Resolver()
export class DistrictResolver {
  @Query(() => [District])
  districtList() {
    return District.find();
  }

  @Query(() => District)
  district(@Arg("id") id: string) {
    return District.findOne({ where: { id } });
  }

  @Mutation(() => District)
  async createDistrict(@Arg("data") data: CreateDistrictInput) {
    const district = District.create(data);
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
