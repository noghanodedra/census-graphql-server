import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CreateDistrictInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  stateId: number;
}
