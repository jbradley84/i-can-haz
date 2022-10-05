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

// QUERY INDIVIDUAL COLLECTION BY ID
export const SINGLE_COLLECTION = gql`
  query collection($_id: $_id) {
   collection(_id: $_id) {
      _id
      collectionName
      collectionDescription
      itemCount
      items {
         _id
         itemName
         itemImage
         itemDescription
      }
      commentCount
      comments{
         username
         commentBody
         createdAt
      }
   }
  }
`;

// QUERY ME
export const QUERY_ME = gql`
  query me {
    me {
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