import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { WorkClass } from "../../entities/WorkClass";

export default class CreateWorkClass implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository(WorkClass).query(`DELETE FROM work_class;`);

    await connection
      .createQueryBuilder()
      .insert()
      .into(WorkClass)
      .values([
        {
          name: "Public",
          description: "WorkClass 1",
        },
        {
          name: "Private",
          description: "WorkClass 2",
        },
        {
          name: "Other",
          description: "WorkClass 3",
        },
        {
          name: "WorkClass 4",
          description: "WorkClass 4",
        },
        {
          name: "WorkClass 5",
          description: "Occupation 5",
        },
      ])
      .execute();
  }
}
