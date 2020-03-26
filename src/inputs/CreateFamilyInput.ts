import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CreateFamilyInput {
  @Field(() => String)
  headName: string;

  @Field(() => Int)
  censusId: number;
}
