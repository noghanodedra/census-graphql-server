import { InputType, Field } from "type-graphql";

@InputType()
export class CreateIncomeClassInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
