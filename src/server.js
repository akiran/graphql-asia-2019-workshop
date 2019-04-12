import { ApolloServer } from "apollo-server-express";
import express from "express";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const PORT = 4000;

const graphql = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
graphql.applyMiddleware({ app, path: "/" });

app.listen(PORT, a => {
  console.log(`🚀  Server ready at ${PORT}`);
});
