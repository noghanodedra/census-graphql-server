import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Gender } from '../../graphql-api/src/entity/Gender';

@Controller()
export class GenderController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    gender() {
        return this.entityManager.find(Gender);
    }

    @Query()
    genderGet({id}) {
        return this.entityManager.findOne(Gender, id);
    }

    @Mutation()
    genderSave(args) {
        const gender = this.entityManager.create(Gender, args);
        return this.entityManager.save(Gender, gender);
    }

    @Mutation()
    async genderDelete({id}) {
        await this.entityManager.remove(Gender, id);
        return true;
    }
}