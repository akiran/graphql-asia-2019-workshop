import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum Role {
    ADMIN
    REVIEWER
    USER
    UNKNOWN
  }

  type User {
    id: Int!
    email: String
    firstName: String
    lastName: String
    fullName: String
    role: Role
  }

  type Comment {
    id: Int!
    text: String
    author: User
  }

  type Post {
    id: Int!
    title: String!
    description: String
    author: User
    comments: [Comment]
    published: Boolean
  }

  type Query {
    ping: Boolean
    users: [User]
    user(id: Int!): User
    posts: [Post]
    post(id: Int!): Post
  }
`;

export default typeDefs;
