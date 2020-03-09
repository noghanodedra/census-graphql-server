import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Individual } from '../../graphql-api/src/entity/Individual';

@Controller()
export class IndividualController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    individual() {
        return this.entityManager.find(Individual);
    }

    @Query()
    individualGet({id}) {
        return this.entityManager.findOne(Individual, id);
    }

    @Mutation()
    individualSave(args) {
        const caste = this.entityManager.create(Individual, args);
        return this.entityManager.save(Individual, caste);
    }

    @Mutation()
    async individualDelete({id}) {
        await this.entityManager.remove(Individual, id);
        return true;
    }
}