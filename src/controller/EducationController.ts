import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Education } from '../../graphql-api/src/entity/Education';

@Controller()
export class EducationController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    education() {
        return this.entityManager.find(Education);
    }

    @Query()
    educationGet({id}) {
        return this.entityManager.findOne(Education, id);
    }

    @Mutation()
    educationSave(args) {
        const education = this.entityManager.create(Education, args);
        return this.entityManager.save(Education, education);
    }

    @Mutation()
    async educationDelete({id}) {
        await this.entityManager.remove(Education, id);
        return true;
    }
}