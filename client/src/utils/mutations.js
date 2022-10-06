import { gql } from '@apollo/client';

// LOGIN MUTATION
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

// ADD USER MUTATION
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// UPDATE USER MUTATION
export const UPDATE_USER = gql`
  mutation updateUser($username: String, $email: String, $password: String) {
   updateUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
   }
  }
`;

// ADD COLLECTION MUTATION
export const ADD_COLLECTION = gql`
  mutation addCollection($collectionName: String!, $collectionDescription: String!) {
   addCollection(collectionName: $collectionName, collectionDescription: $collectionDescription) {
      _id
      collectionName
      collectionDescription
      username
   }
  }
`;

// DELETE COLLECTION MUTATION
export const DELETE_COLLECTION = gql`
  mutation deleteCollection($collectionId: ID!) {
   deleteCollection(collectionId: $collectionId) {
      _id
   }
  }
`;

// ADD ITEM MUTATION
export const ADD_ITEM = gql`
  mutation addItem($collectionId: ID!, $itemName: String!, $itemImage: String!, $itemDescription: String!) {
   addItem(collectionId: $collectionId, itemName: $itemName, itemImage: $itemImage, itemDescription: $itemDescription) {
      _id
      itemCount
      items {
         _id
         itemName
         itemImage
         itemDescription
      }
   }
  }
`;