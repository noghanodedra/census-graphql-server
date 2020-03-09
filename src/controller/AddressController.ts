import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Address } from '../../graphql-api/src/entity/Address';

@Controller()
export class AddressController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    address() {
        return this.entityManager.find(Address);
    }

    @Query()
    addressGet({id}) {
        return this.entityManager.findOne(Address, id);
    }

    @Mutation()
    addressSave(args) {
        const address = this.entityManager.create(Address, args);
        return this.entityManager.save(Address, address);
    }

    @Mutation()
    async addressDelete({id}) {
        await this.entityManager.remove(Address, id);
        return true;
    }
}