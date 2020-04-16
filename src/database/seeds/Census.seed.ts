import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Census } from "../../entities/Census";

export default class CreateCensus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository(Census).query(`DELETE FROM census;`);
    await connection
      .createQueryBuilder()
      .insert()
      .into(Census)
      .values([
        {
          name: "Census 2019",
          description: "Census 2019",
        },
        {
          name: "Census 2020",
          description: "Census 2020",
        },
      ])
      .execute();
  }
}
