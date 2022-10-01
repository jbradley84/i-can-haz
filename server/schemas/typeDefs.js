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
      addCollection(collectionName: String!, collectionDescription: String!): Collection
      addItem(collectionId: ID!, itemName: String!, itemImage: String!, itemDescription: String!): Collection
      addComment(collectionId: ID!, commentBody: String!): Collection
    }

   type Auth {
      token: ID!
      user: User
    }
`;

// export typeDefs
module.exports = typeDefs;


