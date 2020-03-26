import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateAddressInput {
  @Field({ nullable: true })
  line1?: string;

  @Field({ nullable: true })
  line2?: string;

  @Field({ nullable: true })
  line3?: string;

  @Field({ nullable: true })
  postcode?: string;

  @Field({ nullable: true })
  townCity?: string;

  @Field({ nullable: true })
  state?: string;

  @Field({ nullable: true })
  district?: string;
}
