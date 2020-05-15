import { InputType, Field, Int } from "type-graphql";

@InputType()
export class UpdateDistrictInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => Int)
  stateId: number;
}
