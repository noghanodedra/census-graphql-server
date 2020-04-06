import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Caste } from "../../entities/Caste";

export default class CreateCaste implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository(Caste).query(`DELETE FROM caste;`);
    //await connection.getRepository(Caste).clear();
    await connection
      .createQueryBuilder()
      .insert()
      .into(Caste)
      .values([
        {
          name: "Caste 1",
          description: "Caste 1",
          religion: "Religion 1",
          minority: true,
        },
        {
          name: "Caste 2",
          description: "Caste 2",
          religion: "Religion 2",
          minority: false,
        },
        {
          name: "Caste 3",
          description: "Caste 3",
          religion: "Religion 3",
          minority: true,
        },
        {
          name: "Caste 4",
          description: "Caste 4",
          religion: "Religion 4",
          minority: false,
        },
      ])
      .execute();
  }
}
