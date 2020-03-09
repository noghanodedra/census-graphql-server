import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Caste } from '../../graphql-api/src/entity/Caste';

@Controller()
export class CasteController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    caste() {
        return this.entityManager.find(Caste);
    }

    @Query()
    casteGet({id}) {
        return this.entityManager.findOne(Caste, id);
    }

    @Mutation()
    casteSave(args) {
        const caste = this.entityManager.create(Caste, args);
        return this.entityManager.save(Caste, caste);
    }

    @Mutation()
    async casteDelete({id}) {
        await this.entityManager.remove(Caste, id);
        return true;
    }
}