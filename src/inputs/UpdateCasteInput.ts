import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateCasteInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  religion?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  minority?: boolean;
}
