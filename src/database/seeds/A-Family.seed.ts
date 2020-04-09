import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Family } from "../../entities/Family";

export default class CreateFamily implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository(Family).query(`DELETE FROM family;`);
  }
}
