import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { MaritalStatus } from "../../entities/MaritalStatus";

export default class CreateMaritalStatus implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(MaritalStatus)
      .query(`DELETE FROM marital_status;`);

    await connection
      .createQueryBuilder()
      .insert()
      .into(MaritalStatus)
      .values([
        {
          name: "Married",
          description: "MaritalStatus 1",
        },
        {
          name: "Never-Married",
          description: "MaritalStatus 2",
        },
        {
          name: "Separated",
          description: "MaritalStatus 3",
        },
        {
          name: "Widowed",
          description: "MaritalStatus 4",
        },
        {
          name: "Divorced",
          description: "MaritalStatus 5",
        },
      ])
      .execute();
  }
}
