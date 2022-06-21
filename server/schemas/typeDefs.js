const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    causes: [Cause]
    points: Int
  }

  type Cause {
    _id: ID
    title: String
    description: String
    url: String
    category: String
    medals: [Medal]
    comments:[Comment]
    location: String
  }

  type Comment {
    _id: ID
    commentText: String
    causeId: ID
    userId: ID
  }

  type Category {
    _id: ID
    title: String
  }

  type Medal {
    title: String
    pointMin: Int
  }

  type Share {
    _id: ID
    title: String
    description: String
    url: String
  }

  type Point {
    _id: ID
    causeId: ID
    userId: ID
  }

  type Query {
    me: User
    user: User
    users: [User]
    causes(username: String): [Cause]
    cause(_id: ID!): Cause
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): User

  }
`;

module.exports = typeDefs;
