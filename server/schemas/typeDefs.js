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

   type Query {
      collections: [Collection]
   }
`;

// export typeDefs
module.exports = typeDefs;