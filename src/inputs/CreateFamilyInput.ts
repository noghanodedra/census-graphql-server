import { InputType, Field, Int } from "type-graphql";

import { CreateAddressInput } from "./CreateAddressInput";
@InputType()
export class CreateFamilyInput {
  @Field(() => String)
  headName: string;

  @Field(() => Int)
  censusId: number;

  @Field({ nullable: true })
  addressId?: number;

  @Field(() => CreateAddressInput)
  address: CreateAddressInput;
}
