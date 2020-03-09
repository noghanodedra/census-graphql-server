import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { WorkClass } from '../../graphql-api/src/entity/WorkClass';

@Controller()
export class WorkClassController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    workClass() {
        return this.entityManager.find(WorkClass);
    }

    @Query()
    workClassGet({id}) {
        return this.entityManager.findOne(WorkClass, id);
    }

    @Mutation()
    workClassSave(args) {
        const user = this.entityManager.create(WorkClass, args);
        return this.entityManager.save(WorkClass, user);
    }

    @Mutation()
    async workClassDelete({id}) {
        await this.entityManager.remove(WorkClass, id);
        return true;
    }
}