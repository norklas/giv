const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    causes: [Cause]
    points: Int
  }

  type Comment {
    _id: ID
    body: String
    username: String
    createdAt: String
  }

  type Medal {
    _id: ID
    body: String
    username: String
    createdAt: String
  }

  type Cause {
    _id: ID
    title: String
    description: String
    url: String
    location: String
    comments: [Comment]
    medals: [Medal]
    category: String
    points: Int
  }

  type Query {
    me: User
    user(_id: ID!): User
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
    addUser(username: String!, email: String!, password: String!): Auth
    addUserPoints(userId: ID!, purchaseNumber: Int!): User
    addCausePoints(causeId: ID!, donationNumber: Int!): Cause
    addCause(
      title: String!
      description: String!
      url: String!
      location: String!
      category: String!
    ): Cause
    addComment(causeId: ID!, body: String!): Cause
    deleteUser(userId: ID!): Auth
    deleteCause(causeId: ID!): Cause
    deleteComment(causeId: ID!, commentId: ID!): Cause
  }
`;

module.exports = typeDefs;
