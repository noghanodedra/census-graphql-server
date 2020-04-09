import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Individual } from "../../entities/Individual";

export default class CreateIndividual implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository(Individual).query(`DELETE FROM individual;`);
  }
}
