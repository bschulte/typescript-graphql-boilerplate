import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { createConnection, ConnectionOptions } from "typeorm";
import express from "express";
import expressJwt from "express-jwt";
import { ApolloServer, Request } from "apollo-server-express";

import dotenv from "dotenv";
dotenv.config();

import { User, Test } from "./entities";
import { TestResolver, UserResolver } from "./resolvers";
import { authChecker } from "./auth/authChecker";

const {
  NODE_ENV = "production",
  PORT = 5000,
  DB_HOST = "localhost",
  DB_PORT = "3306",
  DB_NAME = "localhost",
  DB_USER = "user",
  DB_PASSWORD = "password",
  APP_KEY = "super secret"
} = process.env;

const GRAPHQL_PATH = "/graphql";

const schema = buildSchemaSync({
  resolvers: [TestResolver, UserResolver],
  authChecker
});

const app = express();

const server = new ApolloServer({
  schema,
  context: ({ req }: { req: Request & { user: User } }) => {
    return { req, user: req.user };
  },
  playground: NODE_ENV === "development"
});

// Use express-jwt middleware to validate a provided token
app.use(
  GRAPHQL_PATH,
  expressJwt({
    secret: APP_KEY,
    credentialsRequired: false
  })
);

// Apply GraphQL middleware to the express app
server.applyMiddleware({ app, path: GRAPHQL_PATH });

const options: ConnectionOptions = {
  type: "mariadb",
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  entities: [Test, User],
  synchronize: true
};

(async () => {
  try {
    // Setup DB connection
    await createConnection(options);

    app.listen({ port: PORT }, () => {
      console.log(
        `App listening on http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (err) {
    console.log("Error starting server:", err);
    process.exit(-1);
  }
})();
