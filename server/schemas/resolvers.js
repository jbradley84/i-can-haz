const { User, Collection, Item, Comment } = require('../models');

const resolvers = {
   Query: {
      // all collections
      collections: async () => {
         return Collection.find().sort({ itemCount: -1 })
         .populate('items');
      },

      // all users
      users: async () => {
         return User.find()
         .select('-__v -password')
         .populate('collections');
      },

      // individual user by username
      // user: async (parent, { username }) => {
      //    return User.findOne({ username })
      //    .select('-__v -password')
      // }
   }
};

module.exports = resolvers;