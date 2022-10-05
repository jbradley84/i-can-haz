// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`

   type Collection {
      _id: ID
      collectionName: String
      collectionDescription: String
      username: String
      itemCount: Int
      commentCount: Int
      items: [Item]
      comments: [Comment]
   }

   type Item {
      _id: ID
      itemName: String
      itemImage: String
      itemDescription: String
   }

   type Comment {
      _id: ID
      commentBody: String
      username: String
      createdAt: String
   }

   type User {
      _id: ID
      username: String
      email: String
      collections: [Collection]
      collectionCount: Int
      password: String
   }

   type Query {
      me: User
      users: [User]
      user(username: String!): User
      collections(username: String): [Collection]
      collection(_id: ID!): Collection
   }

   type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      updateUser(username: String, email: String, password: String): User
      deleteUser(userId: ID!): User
      addCollection(collectionName: String!, collectionDescription: String!): Collection
      updateCollection(collectionId: ID!, collectionName: String, collectionDescription: String): Collection
      deleteCollection(collectionId: ID!): Collection
      addItem(collectionId: ID!, itemName: String!, itemImage: String!, itemDescription: String!): Collection
      updateItem(itemId: ID!, itemName: String, itemImage: String, itemDescription: String): Collection
      deleteItem(collectionId: ID!, itemId: ID!): Collection
      addComment(collectionId: ID!, commentBody: String!): Collection
    }

   type Auth {
      token: ID!
      user: User
    }
`;

// export typeDefs
module.exports = typeDefs;


