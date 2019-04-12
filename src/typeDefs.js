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

  type Mutation {
    createPost(title: String, description: String, author: Int): Post
    publishPost(id: Int): Boolean
    createComment(text: String!, post: Int!, author: Int!): Comment
  }

  type Query {
    ping: Boolean
    posts: [Post]
    post(id: Int!): Post
    users: [User]
    user(id: Int!): User
  }
`;

export default typeDefs;
