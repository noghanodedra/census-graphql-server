import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Occupation } from '../../graphql-api/src/entity/Occupation';

@Controller()
export class OccupationController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    occupation() {
        return this.entityManager.find(Occupation);
    }

    @Query()
    occupationGet({id}) {
        return this.entityManager.findOne(Occupation, id);
    }

    @Mutation()
    occupationSave(args) {
        const caste = this.entityManager.create(Occupation, args);
        return this.entityManager.save(Occupation, caste);
    }

    @Mutation()
    async occupationDelete({id}) {
        await this.entityManager.remove(Occupation, id);
        return true;
    }
}