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
      user(username: String!): [User]
      collections: [Collection]
      collection(_id: ID!): Collection
   }

   type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
   }

   type Auth {
      token: ID!
      user: User
    }
`;

// export typeDefs
module.exports = typeDefs;