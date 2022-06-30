const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { Cause, User } = require("../../models");
const dateFormat = require('../../utils/dateFormat')

module.exports = {
  Query: {
    causes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Cause.find(params).sort({ createdAt: -1 });
    },
    cause: async (parent, { _id }) => {
      return Cause.findOne({ _id });
    },
  },

  Mutation: {
    addCausePoints: async (parent, args, context) => {
      if (context.user) {
        const currentDate = dateFormat(Date.now())
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
            createdAt: new Date().toISOString(),
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
            createdAt: new Date().toISOString(),
          });
          await cause.save();
          console.log(cause.medals);

          return cause;
        }
        if (count > 499) {
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
            createdAt: new Date().toISOString(),
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
    addCause: async (parent, args, context) => {
      if (context.user) {
        const cause = await Cause.create({ ...args, userId: context.user._id, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { causes: cause._id } },
          { new: true }
        );
        return cause;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { causeId, body }, context) => {
      if(context.user) {
        const cause = await Cause.findById(causeId);
        const currentDate = dateFormat(Date.now())
        console.log(cause);

        if (cause) {
          cause.comments.unshift({
            body,
            username: context.user.username,
            createdAt: currentDate,
          });

          await cause.save();

          return cause;
        }
      
        throw new UserInputError("Cause not found");
      }
    },
    deleteCause: async (parent, args, context) => {
      const cause = await Cause.findById(args.causeId)
      const count = cause.points
      if (count<0){
      await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $inc: { points: count } },
          { new: true }
        );}
      const deletedCause = await Cause.findByIdAndDelete(args.causeId);
      return deletedCause;
    },
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
    updateCause: async (parent, args, context) => {
      if (context.user) {
        if (args.causeId) {
          if (args.title) {
            console.log(args);
            await Cause.findByIdAndUpdate(
              { _id: args.causeId },
              { title: args.title },
              { new: true }
            );
          }
          if (args.description) {
            console.log(args);
            await Cause.findByIdAndUpdate(
              { _id: args.causeId },
              { description: args.description },
              { new: true }
            );
          }
          if (args.url) {
            console.log(args);
            await Cause.findByIdAndUpdate(
              { _id: args.causeId },
              { url: args.url },
              { new: true }
            );
          }
          if (args.location) {
            console.log(args);
            await Cause.findByIdAndUpdate(
              { _id: args.causeId },
              { location: args.location },
              { new: true }
            );
          }
          if (args.category) {
            console.log(args);
            await Cause.findByIdAndUpdate(
              { _id: args.causeId },
              { category: args.category },
              { new: true }
            );
          }
          return Cause.findById({ _id: args.causeId });
        }
        throw new UserInputError("No cause found with this ID!");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
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
