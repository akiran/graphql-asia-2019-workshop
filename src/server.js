import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import { get } from "lodash";
import cookieParser from "cookie-parser";
import cookie from "cookie";
import morgan from "morgan";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { getUser } from "./connectors";
import AuthDirective from "./AuthDirective";

const PORT = 4000;

function authCheck(token) {
  if (!token) {
    return null;
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  return getUser(decoded.id);
}

const graphql = new ApolloServer({
  schemaDirectives: {
    auth: AuthDirective
  },
  typeDefs,
  resolvers,
  context: options => {
    const { req, res, connection } = options;
    if (connection) {
      return connection.context;
    }
    return {
      user: authCheck(get(req, "cookies.token")),
      res
    };
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      const cookieString = get(webSocket, "upgradeReq.headers.cookie");
      const { token } = cookie.parse(cookieString);
      return {
        ...connectionParams,
        user: authCheck(token)
      };
    }
  },

  playground: {
    settings: {
      "request.credentials": false
    }
  }
});

const app = express();
app.use(cookieParser());
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
