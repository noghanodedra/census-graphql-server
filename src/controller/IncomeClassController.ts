import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { IncomeClass } from '../../graphql-api/src/entity/IncomeClass';

@Controller()
export class IncomeClassController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    incomeClass() {
        return this.entityManager.find(IncomeClass);
    }

    @Query()
    incomeClassGet({id}) {
        return this.entityManager.findOne(IncomeClass, id);
    }

    @Mutation()
    incomeClassSave(args) {
        const incomeClass = this.entityManager.create(IncomeClass, args);
        return this.entityManager.save(IncomeClass, incomeClass);
    }

    @Mutation()
    async incomeClassDelete({id}) {
        await this.entityManager.remove(IncomeClass, id);
        return true;
    }
}