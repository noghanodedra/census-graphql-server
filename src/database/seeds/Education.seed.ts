import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Education } from "../../entities/Education";

export default class CreateEducation implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    //await connection.getRepository(Education).clear();
    await connection.getRepository(Education).query(`DELETE FROM education;`);

    await connection
      .createQueryBuilder()
      .insert()
      .into(Education)
      .values([
        {
          name: "Masters",
          description: "Education 1",
        },
        {
          name: "Bachelors",
          description: "Education 2",
        },
        {
          name: "Ph.d",
          description: "Education 3",
        },
        {
          name: "School",
          description: "Education 4",
        },
      ])
      .execute();
  }
}
