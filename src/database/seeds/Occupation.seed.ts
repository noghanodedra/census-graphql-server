import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Occupation } from "../../entities/Occupation";

export default class CreateOccupation implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository(Occupation).query(`DELETE FROM occupation;`);

    await connection
      .createQueryBuilder()
      .insert()
      .into(Occupation)
      .values([
        {
          name: "Occupation 1",
          description: "Occupation 1",
        },
        {
          name: "Occupation 2",
          description: "Occupation 2",
        },
        {
          name: "Occupation 3",
          description: "Occupation 3",
        },
        {
          name: "Occupation 4",
          description: "Occupation 4",
        },
        {
          name: "Occupation 5",
          description: "Occupation 5",
        },
      ])
      .execute();
  }
}
