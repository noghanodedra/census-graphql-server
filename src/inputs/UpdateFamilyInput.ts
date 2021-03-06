import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateFamilyInput {
  @Field({ nullable: true })
  headName?: string;

  @Field({ nullable: true })
  censusId?: number;
}
