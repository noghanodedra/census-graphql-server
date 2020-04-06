import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { IncomeClass } from "../../entities/IncomeClass";

export default class CreateIncomeClass implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .getRepository(IncomeClass)
      .query(`DELETE FROM income_class;`);

    await connection
      .createQueryBuilder()
      .insert()
      .into(IncomeClass)
      .values([
        {
          name: "50k",
          description: "IncomeClass 1",
        },
        {
          name: "51k-100k",
          description: "IncomeClass 2",
        },
        {
          name: "101k-500k",
          description: "IncomeClass 3",
        },
        {
          name: ">500k",
          description: "IncomeClass 4",
        },
      ])
      .execute();
  }
}
