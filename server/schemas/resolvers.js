//--- Global Variables ---//
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { trusted } = require("mongoose");
const { User, Cause } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");
const dateFormat = require("../utils/dateFormat");

//--- Resolvers ---//

const resolvers = {

  //--- GQL Queries ---//

  Query: {

    //--- READ self data with valid JWT ---//

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("causes");
        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    //--- READ all users ---//

    users: async () => {
      return User.find().select("-__v -password").populate("causes");
    },

    //--- READ single user ---//

    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("causes");
    },

    //--- READ all causes ---//

    causes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Cause.find(params).sort({ createdAt: -1 });
    },

    //--- READ single cause ---//

    cause: async (parent, { _id }) => {
      return Cause.findOne({ _id });
    },
  },

  //--- GQL Mutations ---//

  Mutation: {

  //--- CREATE queries ---//

    //--- CREATE user ---//

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      console.log(args, user, token);

      return { token, user };
    },

    //--- CREATE JWT and login ---//

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

    //--- CREATE points on user model ---//

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

    //--- CREATE cause ---//

    addCause: async (parent, args, context) => {
      if (context.user) {
        const cause = await Cause.create({ ...args, userId: context.user._id });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { causes: cause._id } },
          { new: true }
        );
        return cause;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //--- CREATE comment ---//

    addComment: async (parent, { causeId, body }, context) => {
      const cause = await Cause.findById(causeId);
      const currentDate = dateFormat(Date.now());
      console.log(cause);

      if (cause) {
        cause.comments.unshift({
          body,
          createdAt: currentDate,
          username: context.user.username,
        });

        await cause.save();

        return cause;
      }

      throw new UserInputError("Cause not found");
    },

    //--- DELETE queries ---//

    //--- DELETE user ---//

    deleteUser: async (parent, args, context) => {
      const deletedUser = await User.findByIdAndDelete(args.userId);
      return deletedUser;
    },

    //--- DELETE cause ---//

    deleteCause: async (parent, args, context) => {
      const deletedCause = await Cause.findByIdAndDelete(args.causeId);
      return deletedCause;
    },

    //--- DELETE comment ---//

    deleteComment: async (parent, { causeId, commentId }, context) => {
      const cause = await Cause.findById(causeId);
      if (cause) {
        const commentIndex = cause.comments.findIndex(
          (i) => i.id === commentId
        );
        if (commentIndex === -1) {
          throw new UserInputError("No comment found with this ID!");
        } else {
          console.log(commentId, commentIndex);
          cause.comments.splice(commentIndex, 1);
          await cause.save();
        }
        return cause;
      }
    },

    //--- UPDATE queries ---//

    //--- UPDATE cause points by reducing points from user and adding points to cause ---//

    addCausePoints: async (parent, args, context) => {
      if (context.user) {
        const currentDate = dateFormat(Date.now());
        const cause = await Cause.findById(args.causeId);

        const count = args.donationNumber;

        if (count > 99 && count < 200) {
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $inc: { points: -count } },
            { new: true }
          );

          await Cause.findByIdAndUpdate(
            { _id: args.causeId },
            { $inc: { points: count } },
            { new: true }
          );
          console.log(cause.medals);

          cause.medals.unshift({
            body: "Bronze",
            username: context.user.username,
            createdAt: currentDate,
          });
          await cause.save();
          console.log(cause.medals);

          return cause;
        }

        if (count > 199 && count < 300) {
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $inc: { points: -count } },
            { new: true }
          );

          await Cause.findByIdAndUpdate(
            { _id: args.causeId },
            { $inc: { points: count } },
            { new: true }
          );
          console.log(cause.medals);
          cause.medals.unshift({
            body: "Silver",
            username: context.user.username,
            createdAt: currentDate,
          });
          await cause.save();
          console.log(cause.medals);

          return cause;
        }

        if (count > 299 && count < 500) {
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $inc: { points: -count } },
            { new: true }
          );

          await Cause.findByIdAndUpdate(
            { _id: args.causeId },
            { $inc: { points: count } },
            { new: true }
          );
          console.log(cause.medals);
          cause.medals.unshift({
            body: "Gold",
            username: context.user.username,
            createdAt: currentDate,
          });
          await cause.save();
          console.log(cause.medals);

          return cause;
        }
        if (count > 500) {
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $inc: { points: -count } },
            { new: true }
          );

          await Cause.findByIdAndUpdate(
            { _id: args.causeId },
            { $inc: { points: count } },
            { new: true }
          );
          console.log(cause.medals);
          cause.medals.unshift({
            body: "Platinum",
            username: context.user.username,
            createdAt: currentDate,
          });
          await cause.save();
          console.log(cause.medals);

          return cause;
        }

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $inc: { points: -count } },
          { new: true }
        );

        await Cause.findByIdAndUpdate(
          { _id: args.causeId },
          { $inc: { points: count } },
          { new: true }
        );
        return count;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //--- UPDATE user ---//

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

    //--- UPDATE cause ---//

    updateCause: async (parent, args, context) => {
      if (context.user) {
        if (args.causeId) {
          if (args.title) {
            console.log(args);
            return await Cause.findByIdAndUpdate(
              { _id: args.causeId },
              { title: args.title },
              { new: true }
            );
          }
          if (args.description) {
            console.log(args);
            return await Cause.findByIdAndUpdate(
              { _id: args.causeId },
              { description: args.description },
              { new: true }
            );
          }
          if (args.url) {
            console.log(args);
            return await Cause.findByIdAndUpdate(
              { _id: args.causeId },
              { url: args.url },
              { new: true }
            );
          }
          if (args.location) {
            console.log(args);
            return await Cause.findByIdAndUpdate(
              { _id: args.causeId },
              { location: args.location },
              { new: true }
            );
          }
          if (args.category) {
            console.log(args);
            return await Cause.findByIdAndUpdate(
              { _id: args.causeId },
              { category: args.category },
              { new: true }
            );
          }
        }
        throw new UserInputError("No cause found with this ID!");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //--- UPDATE comment ---//

    updateComment: async (parent, args, context) => {
      const cause = await Cause.findById(args.causeId);
      if (cause) {
        const commentIndex = cause.comments.findIndex(
          (i) => i.id === args.commentId
        );
        if (commentIndex === -1) {
          throw new UserInputError("No comment found with this ID!");
        } else {
          cause.comments[commentIndex].body = args.body;
          await cause.save();
        }
        return cause;
      }
    },
  },
};

module.exports = resolvers;
