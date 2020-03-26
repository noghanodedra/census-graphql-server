import { InputType, Field } from "type-graphql";

@InputType()
export class CreateRelationshipInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;
}
