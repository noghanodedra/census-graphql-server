import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";

import { sendRefreshToken } from "./auth/SendRefreshToken";
import { createAccessToken, createRefreshToken } from "./auth/AuthHelper";

import { User } from "./entity/User";

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

(async () => {
    const app = express();
    const corsConfig =
    process.env.NODE_ENV !== "production"
        ? {
            origin: "http://localhost:3000",
            credentials: true
        }
        : {
            origin: "https://mysite.com",
            credentials: true
        };
    app.use(cors(corsConfig));
    app.use(cookieParser());
    app.post("/refresh_token", async (req, res) => {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }
        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err) {
            console.log(err);
            return res.send({ ok: false, accessToken: "" });
        }
    
        // token is valid and
        // we can send back an access token
        const user = await User.findOne({ id: payload.userId });
        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }
        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }
        sendRefreshToken(res, createRefreshToken(user));
        return res.send({ ok: true, accessToken: createAccessToken(user) });
    });
    
    await createConnection();
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
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
        }),
        introspection: true,
        playground: true,
        context: ({ req, res }) => ({ req, res })
    });
    const path = process.env.APP_PATH || '/graphql';
    apolloServer.applyMiddleware({ app, path, cors: false });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
    });

})();