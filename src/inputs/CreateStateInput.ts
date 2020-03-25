import { InputType, Field } from "type-graphql";

@InputType()
export class CreateStateInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  code: string;
}
