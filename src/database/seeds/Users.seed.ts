import { Factory, Seeder } from "typeorm-seeding";
import { hash } from "bcryptjs";
import { Connection } from "typeorm";

import { User } from "../../entities/User";

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository(User).clear(); // remove all users
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          firstName: "admin",
          lastName: "admin",
          active: true,
          isAdmin: true,
          email: "admin@admin.com",
          password: await hash("admin", 17),
          lastLoggedIn: "2015-01-12 12:45:00",
        },
        {
          firstName: "dev",
          lastName: "dev",
          active: true,
          isAdmin: false,
          email: "dev@dev.com",
          password: await hash("dev", 17),
          lastLoggedIn: "2015-01-12 12:45:00",
        },
        {
          firstName: "test",
          lastName: "test",
          active: true,
          isAdmin: false,
          email: "test@test.com",
          password: await hash("test", 17),
          lastLoggedIn: "2015-01-12 12:45:00",
        },
      ])
      .execute();
  }
}
