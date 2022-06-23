import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      causes {
        _id
        title
        description
        url
        location
        category
        points
        comments {
          _id
          body
          createdAt
          username
        }
        medals {
          _id
          body
          username
          createdAt
        }
      }
      points
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      __id
      username
      email
      causes {
        _id
        title
        description
        url
        location
        category
        points
        comments {
          _id
          body
          createdAt
          username
        }
        medals {
          _id
          body
          username
          createdAt
        }
      }
      points
    }
  }
`;
