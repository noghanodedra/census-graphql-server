import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

import { AddressResolver } from "./resolvers/AddressResolver";
import { CasteResolver } from "./resolvers/CasteResolver";
import { CensusResolver } from "./resolvers/CensusResolver";
import { EducationResolver } from "./resolvers/EducationResolver";
import { FamilyResolver } from "./resolvers/FamilyResolver";
import { GenderResolver } from "./resolvers/GenderResolver";
import { IncomeClassResolver } from "./resolvers/IncomeClassResolver";
import { IndividualResolver } from "./resolvers/IndividualResolver";
import { OccupationResolver } from "./resolvers/OccupationResolver";
import { RelationshipResolver } from "./resolvers/RelationshipResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { WorkClassResolver } from "./resolvers/WorkClassResolver";
import { MaritalStatusResolver } from "./resolvers/MaritalStatusResolver";

async function main() {
    await createConnection();
    const schema = await buildSchema (
    { 
        resolvers: [
            AddressResolver, 
            CasteResolver, 
            CensusResolver,
            EducationResolver,
            FamilyResolver,
            GenderResolver,
            IncomeClassResolver,
            IndividualResolver,
            MaritalStatusResolver,
            OccupationResolver,
            RelationshipResolver,
            UserResolver,
            WorkClassResolver,
        ] 
    });
    const server = new ApolloServer({ schema });
    await server.listen(4000);
    console.log("Server has started!");
}

main();