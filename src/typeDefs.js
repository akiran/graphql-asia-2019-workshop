import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Query {
    ping: Boolean
  }
`;

export default typeDefs;
