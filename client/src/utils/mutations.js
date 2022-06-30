import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER_POINTS = gql`
  mutation AddUserPoints($userId: ID!, $purchaseNumber: Int!) {
    addUserPoints(userId: $userId, purchaseNumber: $purchaseNumber) {
      _id
      username
      points
    }
  }
`;

export const ADD_CAUSE = gql`
  mutation AddCause(
    $title: String!
    $description: String!
    $url: String!
    $location: String!
    $category: String!
  ) {
    addCause(
      title: $title
      description: $description
      url: $url
      location: $location
      category: $category
    ) {
      _id
      title
      description
      url
      location
      category
      username
    }
  }
`;

export const ADD_CAUSE_POINTS = gql`
  mutation AddCausePoints($causeId: ID!, $donationNumber: Int!) {
    addCausePoints(causeId: $causeId, donationNumber: $donationNumber) {
      _id
      title
      points
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($causeId: ID!, $body: String!) {
    addComment(causeId: $causeId, body: $body) {
      comments {
        _id
        body
        username
        createdAt
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
      username
      email
      _id
    }
  }
`;

export const UPDATE_CAUSE = gql`
mutation UpdateCause($causeId: ID!, $title: String, $description: String, $url: String, $location: String, $category: String) {
  updateCause(causeId: $causeId, title: $title, description: $description, url: $url, location: $location, category: $category) {
    title
    _id
    description
    url
    location
    category
    createdAt
  }
}
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($causeId: ID!, $commentId: ID!, $body: String!) {
    updateComment(causeId: $causeId, commentId: $commentId, body: $body) {
      comments {
        _id
        body
        username
        createdAt
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation Mutation($userId: ID!) {
    deleteUser(userId: $userId) {
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_CAUSE = gql`
  mutation Mutation($causeId: ID!) {
    deleteCause(causeId: $causeId) {
      _id
      title
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($causeId: ID!, $commentId: ID!) {
    deleteComment(causeId: $causeId, commentId: $commentId) {
      comments {
        _id
        body
      }
    }
  }
`;
