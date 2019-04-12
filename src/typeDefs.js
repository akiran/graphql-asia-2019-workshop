import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum Role {
    ADMIN
    REVIEWER
    USER
    UNKNOWN
  }

  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

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
    signup(
      email: String!
      password: String!
      firstName: String
      lastName: String
      role: Role
    ): Boolean
    login(email: String!, password: String!): Boolean
    logout: Boolean
    createPost(title: String, description: String, author: Int): Post
    publishPost(id: Int): Boolean @auth(requires: ADMIN)
    createComment(text: String!, post: Int!, author: Int!): Comment
  }

  type Query {
    ping: Boolean
    me: User
    posts: [Post]
    post(id: Int!): Post
    users: [User]
    user(id: Int!): User
  }

  type Subscription {
    onNewPost: Post
  }
`;

export default typeDefs;
