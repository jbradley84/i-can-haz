const { User, Collection, Item, Comment } = require('../models');

const resolvers = {
   Query: {
      collections: async () => {
         return Collection.find().sort({ itemCount: -1 });
      }
   }
};

module.exports = resolvers;