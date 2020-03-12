import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Address } from "../entity/Address";
import { CreateAddressInput } from "../inputs/CreateAddressInput";
import { UpdateAddressInput } from "../inputs/UpdateAddressInput";

@Resolver()
export class AddressResolver {

    @Query(() => [Address])
    addressList() {
        return Address.find();
    }

    @Query(() => Address)
    address(@Arg("id") id: string) {
        return Address.findOne({ where: { id } });
    }

    @Mutation(() => Address)
    async createAddress(@Arg("data") data: CreateAddressInput) {
        const address = Address.create(data);
        await address.save();
        return address;
    }

    @Mutation(() => Address)
    async updateAddress(@Arg("id") id: string, @Arg("data") data: UpdateAddressInput) {
        const address = await Address.findOne({ where: { id } });
        if (!address) throw new Error("Address not found!");
        Object.assign(address, data);
        await address.save();
        return address;
    }

    @Mutation(() => Boolean)
    async deleteAddress(@Arg("id") id: string) {
        const address = await Address.findOne({ where: { id } });
        if (!address) throw new Error("Address not found!");
        await address.remove();
        return true;
    }
    
}