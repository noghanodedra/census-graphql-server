import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Family } from '../../graphql-api/src/entity/Family';

@Controller()
export class FamilyController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    family() {
        return this.entityManager.find(Family);
    }

    @Query()
    familyGet({id}) {
        return this.entityManager.findOne(Family, id);
    }

    @Mutation()
    familySave(args) {
        const family = this.entityManager.create(Family, args);
        return this.entityManager.save(Family, family);
    }

    @Mutation()
    async familyDelete({id}) {
        await this.entityManager.remove(Family, id);
        return true;
    }
}