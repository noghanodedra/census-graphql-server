import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import cors from "cors";
import "dotenv/config";

import { ValidateTokensMiddleware } from "./auth/ValidateTokensMiddleware";
import { AuthenticationError, ForbiddenError } from "apollo-server";

import { AddressResolver } from "./resolvers/AddressResolver";
import { CasteResolver } from "./resolvers/CasteResolver";
import { CensusResolver } from "./resolvers/CensusResolver";
import { DistrictResolver } from "./resolvers/DistrictResolver";
import { EducationResolver } from "./resolvers/EducationResolver";
import { FamilyResolver } from "./resolvers/FamilyResolver";
import { GenderResolver } from "./resolvers/GenderResolver";
import { IncomeClassResolver } from "./resolvers/IncomeClassResolver";
import { IndividualResolver } from "./resolvers/IndividualResolver";
import { OccupationResolver } from "./resolvers/OccupationResolver";
import { RelationshipResolver } from "./resolvers/RelationshipResolver";
import { StateResolver } from "./resolvers/StateResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { WorkClassResolver } from "./resolvers/WorkClassResolver";
import { MaritalStatusResolver } from "./resolvers/MaritalStatusResolver";

(async () => {
  const app = express();
  const corsConfig =
    process.env.NODE_ENV !== "production"
      ? {
          origin: "http://192.168.43.7:19006",
          credentials: true,
        }
      : {
          origin: "https://nodedra.com",
          credentials: true,
        };
  app.use(cors(corsConfig));
  app.use(cookieParser());
  app.use(ValidateTokensMiddleware);

  app.disable("x-powered-by"); // disable X-Powered-By header

  app.use(function (req, res, next) {
    res.header("X-XSS-Protection", "1; mode=block");
    res.header("X-Frame-Options", "deny");
    res.header("X-Content-Type-Options", "nosniff");
    next();
  });

  await createConnection();

  const formatError = (error: any) => {
    const { extensions } = error;
    console.error(error);
    const exception = extensions.exception ? extensions.exception : {};
    console.error("\nStackTrace");
    console.error(exception.stacktrace);
    exception.stacktrace = null;
    return error;
  };

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AddressResolver,
        CasteResolver,
        CensusResolver,
        DistrictResolver,
        EducationResolver,
        FamilyResolver,
        GenderResolver,
        IncomeClassResolver,
        IndividualResolver,
        MaritalStatusResolver,
        OccupationResolver,
        RelationshipResolver,
        StateResolver,
        UserResolver,
        WorkClassResolver,
      ],
    }),
    introspection: true,
    playground: true,
    debug: true,
    formatError,
    context: ({ req, res }) => {
      if (
        req.body &&
        (req.body.operationName === "login" ||
          req.body.operationName === "logout")
      ) {
        return { req, res };
      }

      //@ts-ignore
      const accessToken = req.token; //req.cookies["access"];
      if (!accessToken) {
        throw new AuthenticationError("Not Authenticated");
      }

      verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!,
        (err: any, decodedToken: any) => {
          if (err || !decodedToken) {
            throw new ForbiddenError("Not Authorized");
          }
          //@ts-ignore
          req.user = decodedToken;
        }
      );
      return { req, res };
    },
  });
  const path = process.env.APP_PATH || "/graphql";
  apolloServer.applyMiddleware({ app, path, cors: false });
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
})();
