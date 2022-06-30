const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../../models");
const { signToken } = require("../../utils/auth");
const bcrypt = require("bcrypt");

module.exports = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("causes");
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    users: async () => {
      return User.find().select("-__v -password").populate("causes");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("causes");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      console.log(args, user, token);

      return { token, user };
    },
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
    addUserPoints: async (parent, args, context) => {
      console.log(args, context.user);
      if (context.user) {
        const count = args.purchaseNumber;

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $inc: { points: count } },
          { new: true }
        );
        return count;
      }
      
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteUser: async (parent, args, context) => {
      const deletedUser = await User.findByIdAndDelete(args.userId);
      return deletedUser;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        if (args.username) {
          console.log(args);
          return await User.findByIdAndUpdate(
            { _id: context.user._id },
            { username: args.username },
            { new: true }
          );
        }
        if (args.password) {
          const saltRounds = 12;
          const hash = await bcrypt.hash(args.password, saltRounds);
          console.log(args);
          return await User.findByIdAndUpdate(
            { _id: context.user._id },
            { password: hash },
            { new: true }
          );
        }
        if (args.email) {
          console.log(args);
          return await User.findByIdAndUpdate(
            { _id: context.user._id },
            { email: args.email },
            { new: true }
          );
        }
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};
