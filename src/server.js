import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import morgan from "morgan";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const PORT = 4000;

const graphql = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();
app.use(
  morgan(function(tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body, null, 2)
    ].join(" ");
  })
);
graphql.applyMiddleware({ app, path: "/" });
const server = http.createServer(app);
graphql.installSubscriptionHandlers(server);

server.listen(PORT, a => {
  console.log(`🚀  Server ready at ${PORT}`);
});
