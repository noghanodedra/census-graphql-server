import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Gender } from "../../entities/Gender";

export default class CreateGender implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository(Gender).query(`DELETE FROM gender;`);

    await connection
      .createQueryBuilder()
      .insert()
      .into(Gender)
      .values([
        {
          name: "Male",
          description: "Gender 1",
        },
        {
          name: "Female",
          description: "Gender 2",
        },
      ])
      .execute();
  }
}
