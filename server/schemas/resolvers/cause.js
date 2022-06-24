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

        if (count > 299 && count <= 500) {
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
    addComment: async (parent, { causeId, body }, context) => {
      const cause = await Cause.findById(causeId);
      const currentDate = dateFormat(Date.now())
      console.log(cause);

      if (cause) {
        cause.comments.unshift({
          body,
          createdAt: currentDate,
        });

        await cause.save();

        return cause;
      }

      throw new UserInputError("Cause not found");
    },
  },
};
