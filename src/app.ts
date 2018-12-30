import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { ApolloServer } from "apollo-server";

import dotenv from "dotenv";
dotenv.config();

import { TestResolver } from "./resolvers";

const { NODE_ENV } = process.env;

const schema = buildSchemaSync({ resolvers: [TestResolver] });

const server = new ApolloServer({
  schema,
  playground: NODE_ENV === "development"
});

server.listen().then(({ url }: { url: string }) => {
  console.log("Listening on url:", url);
});
