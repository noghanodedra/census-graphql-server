import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Relationship } from "../../entities/Relationship";

export default class CreateRelationship implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(Relationship)
      .query(`DELETE FROM relationship;`);

    await connection
      .createQueryBuilder()
      .insert()
      .into(Relationship)
      .values([
        {
          name: "Husband",
          description: "Relationship 1",
        },
        {
          name: "Wife",
          description: "Relationship 2",
        },
        {
          name: "Daughter",
          description: "Relationship 3",
        },
        {
          name: "Son",
          description: "Relationship 4",
        },
        {
          name: "Relationship 5",
          description: "Occupation 5",
        },
      ])
      .execute();
  }
}
