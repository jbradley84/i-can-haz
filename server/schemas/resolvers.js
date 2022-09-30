const { User, Collection, Item, Comment } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // ME QUERY
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        //  .populate("collections");

        return userData;
      }
      throw new AuthenticationError("Not logged in");
    },

    // GET ALL COLLECTIONS
    collections: async () => {
      return Collection.find().sort({ itemCount: -1 });
    },

    // GET ALL USERS
    users: async () => {
      return User.find().select("-__v -password");
    },

    //  GET INDIVIDUAL USER BY USERNAME
    user: async (parent, { username }) => {
      return User.findOne({ username }).select("-__v -password");
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
  },
};

module.exports = resolvers;
