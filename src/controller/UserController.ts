import { Controller, Mutation, Query } from 'vesper';
import { EntityManager } from 'typeorm';
import { User } from '../../graphql-api/src/entity/User';

@Controller()
export class UserController {

    constructor(private entityManager: EntityManager) {
    }

    @Query()
    user() {
        return this.entityManager.find(User);
    }

    @Query()
    userGet({id}) {
        return this.entityManager.findOne(User, id);
    }

    @Mutation()
    userSave(args) {
        const user = this.entityManager.create(User, args);
        return this.entityManager.save(User, user);
    }

    @Mutation()
    async userDelete({id}) {
        await this.entityManager.remove(User, id);
        return true;
    }
}