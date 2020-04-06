import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { State } from "../../entities/State";
import { District } from "../../entities/District";

export default class CreateState implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository(District).query(`DELETE FROM district;`);
    await connection.getRepository(State).query(`DELETE FROM state;`);

    await connection
      .createQueryBuilder()
      .insert()
      .into(State)
      .values([
        {
          name: "Gujarat",
          code: "GJ",
        },
        {
          name: "Maharastra",
          code: "MH",
        },
        {
          name: "Goa",
          code: "GA",
        },
        {
          name: "Rajasthan",
          code: "RJ",
        },
      ])
      .execute();

    const state = await connection
      .createQueryBuilder()
      .select("state")
      .from(State, "state")
      .where("state.id = :id", { id: 1 })
      .getOne();

    await connection
      .createQueryBuilder()
      .insert()
      .into(District)
      .values([
        {
          name: "Ahmedabad",
          state: state,
        },
        {
          name: "Amreli",
          state: state,
        },
        {
          name: "Botad",
          state: state,
        },
        {
          name: "Jamnagar",
          state: state,
        },
        {
          name: "Porbandar",
          state: state,
        },
      ])
      .execute();
  }
}
