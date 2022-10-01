const { User, Collection } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
   Query: {
      // ME QUERY
      me: async (parent, args, context) => {
         if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
               .select("-__v -password")
               .populate("collections");

            return userData;
         }
         throw new AuthenticationError("Not logged in");
      },

      // GET ALL COLLECTIONS
      collections: async () => {
         return Collection.find()
            .sort({ itemCount: -1 })
            .populate("items")
            .populate("comments");
      },

      // GET ALL USERS
      users: async () => {
         return User.find()
            .select("-__v -password")
            .populate("collections");
      },

      // GET INDIVIDUAL COLLECTION BY _ID
      collection: async (parent, { _id }) => {
         return Collection.findOne({ _id });
      },

      //  GET INDIVIDUAL USER BY USERNAME
      user: async (parent, { username }) => {
         return User.findOne({ username })
            .select("-__v -password")
            .populate("collections");
      },
   },


   Mutation: {
      // ADD USER MUTATION
      addUser: async (parent, args) => {
         const user = await User.create(args);
         const token = signToken(user);
       
         return { token, user };
       },

      // LOGIN MUTATION
      login: async (parent, { email, password }) => {
         const user = await User.findOne({ email });

         if (!user) {
            throw new AuthenticationError("Incorrect credentials");
         }

         const correctPw = await user.isCorrectPassword(password);

         if (!correctPw) {
            throw new AuthenticationError("Incorrect credentials");
         }

         const token = signToken(user);
         return { token, user };
      },

      // ADD COLLECTION MUTATION
      addCollection: async (parent, args, context) => {
         if (context.user) {
            const collection = await Collection.create({
               ...args,
               username: context.user.username,
            });

            await User.findByIdAndUpdate(
               { _id: context.user._id },
               { $push: { collections: collection._id } },
               { new: true }
            );

            return collection;
         }

         throw new AuthenticationError("You need to be logged in!");
      },

      // ADD ITEM TO COLLECTION
      addItem: async (parent, { collectionId, itemName, itemImage, itemDescription }, context) => {
         if (context.user) {
            const updatedCollection = await Collection.findOneAndUpdate(
               { _id: collectionId },
               { $push: { items: { itemName, itemDescription, itemImage } } },
               { new: true, runValidators: true }
            );

            return updatedCollection;
         }

         throw new AuthenticationError('You need to be logged in!');
      },

      // ADD COMMENT TO COLLECTION
      addComment: async (parent, { collectionId, commentBody }, context) => {
         if (context.user) {
            const updatedCollection = await Collection.findOneAndUpdate(
               { _id: collectionId },
               { $push: { comments: { commentBody, username: context.user.username } } },
               { new: true, runValidators: true }
            );

            return updatedCollection;
         }

         throw new AuthenticationError('You need to be logged in!');
      }
   },
};

module.exports = resolvers;
