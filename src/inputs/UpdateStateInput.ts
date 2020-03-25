import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateStateInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  code?: string;
}
