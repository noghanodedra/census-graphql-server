import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateIndividualInput {
  @Field({ nullable: true })
  name?: string;

  @Field()
  age?: number;

  @Field()
  educationYears?: number;

  @Field()
  hoursPerWeek?: number;
}
