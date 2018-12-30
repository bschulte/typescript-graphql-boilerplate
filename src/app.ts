import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { createConnection, ConnectionOptions } from "typeorm";
import { ApolloServer } from "apollo-server";

import dotenv from "dotenv";
dotenv.config();

import { User, Test } from "./entities";
import { TestResolver, UserResolver } from "./resolvers";

const {
  NODE_ENV = "production",
  DB_HOST = "localhost",
  DB_PORT = "3306",
  DB_NAME = "localhost",
  DB_USER = "user",
  DB_PASSWORD = "password"
} = process.env;

const schema = buildSchemaSync({ resolvers: [TestResolver, UserResolver] });

const server = new ApolloServer({
  schema,
  playground: NODE_ENV === "development"
});

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

    const { url } = await server.listen();
    console.log("Listening on url:", url);
  } catch (err) {
    console.log("Error starting server:", err);
    process.exit(-1);
  }
})();
