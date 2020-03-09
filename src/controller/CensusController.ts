import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Census } from '../../graphql-api/src/entity/Census';

@Controller()
export class CensusController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    caste() {
        return this.entityManager.find(Census);
    }

    @Query()
    casteGet({id}) {
        return this.entityManager.findOne(Census, id);
    }

    @Mutation()
    casteSave(args) {
        const census = this.entityManager.create(Census, args);
        return this.entityManager.save(Census, census);
    }

    @Mutation()
    async censusDelete({id}) {
        await this.entityManager.remove(Census, id);
        return true;
    }
}