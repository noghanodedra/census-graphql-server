import { InputType, Field } from "type-graphql";

@InputType()
export class CreateCasteInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  religion: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean)
  minority: boolean;
}
