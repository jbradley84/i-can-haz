import { gql } from '@apollo/client';

// QUERY SINGLE USER
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      collections {
        _id
        collectionName
        collectionDescription
        itemCount
        commentCount
      }
    }
  }
`;

// QUERY ALL COLLECTIONS
export const QUERY_COLLECTIONS = gql`
  query collections($username: String) {
    collections(username: $username) {
    _id
    collectionName
    collectionDescription
    username
    itemCount
    commentCount
    }
  }
`;

// QUERY ME
export const QUERY_ME = gql`
  query me {
   _id
   username
   email
   collections {
      _id
      collectionName
      collectionDescription
      itemCount
      commentCount
   }
  }
`