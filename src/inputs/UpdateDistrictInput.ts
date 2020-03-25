import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateDistrictInput {
  @Field({ nullable: true })
  name?: string;
}
