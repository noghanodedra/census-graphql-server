import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { Relationship } from '../../graphql-api/src/entity/Relationship';

@Controller()
export class RelationshipController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    relationship() {
        return this.entityManager.find(Relationship);
    }

    @Query()
    relationshipGet({id}) {
        return this.entityManager.findOne(Relationship, id);
    }

    @Mutation()
    relationshipSave(args) {
        const caste = this.entityManager.create(Relationship, args);
        return this.entityManager.save(Relationship, caste);
    }

    @Mutation()
    async relationshipDelete({id}) {
        await this.entityManager.remove(Relationship, id);
        return true;
    }
}