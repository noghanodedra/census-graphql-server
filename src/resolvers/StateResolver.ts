import { Resolver, Query, Mutation, Arg } from "type-graphql";

import { State } from "@entities/State";
import { CreateStateInput } from "@inputs/CreateStateInput";
import { UpdateStateInput } from "@inputs/UpdateStateInput";

@Resolver()
export class StateResolver {
  @Query(() => [State])
  stateList() {
    return State.find({
      relations: ["districts"],
      order: {
        name: "ASC",
      },
    });
  }

  @Query(() => State)
  state(@Arg("id") id: string) {
    return State.findOne({ where: { id }, relations: ["districts"] });
  }

  @Mutation(() => State)
  async createState(@Arg("data") data: CreateStateInput) {
    const state = State.create(data);
    await state.save();
    return state;
  }

  @Mutation(() => State)
  async updateState(
    @Arg("id") id: string,
    @Arg("data") data: UpdateStateInput
  ) {
    const state = await State.findOne({ where: { id } });
    if (!state) throw new Error("State not found!");
    Object.assign(state, data);
    await state.save();
    return state;
  }

  @Mutation(() => Boolean)
  async deleteState(@Arg("id") id: string) {
    const state = await State.findOne({ where: { id } });
    if (!state) throw new Error("State not found!");
    await state.remove();
    return true;
  }
}
