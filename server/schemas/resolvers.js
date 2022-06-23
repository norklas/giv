const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { trusted } = require("mongoose");
const { User, Cause  } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require('bcrypt')

const resolvers = {
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
    causes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Cause.find(params).sort({ createdAt: -1 });
    },
    cause: async (parent, { _id }) => {
      return Cause.findOne({ _id });
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
      console.log(args, context.user)
      if (context.user) {
        const count = args.purchaseNumber

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $inc: { points: count }},
          { new: true }
        );
        return count;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addCausePoints: async (parent, args, context) => {
      if (context.user) {
        console.log(args)
        const cause = await Cause.findById(args.causeId)
        
        const count = args.donationNumber
        
        if( count > 99  && count < 200){
          
         
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $inc: { points: -count }},
            { new: true }
          );

          await Cause.findByIdAndUpdate(
            {_id: args.causeId},
            { $inc: { points: count }},
            { new: true }
          )
          console.log(cause.medals)
          cause.medals.unshift({
            body: 'Bronze',
            username: context.user.username,
            createdAt: new Date().toISOString()
          })
          await cause.save()
          console.log(cause.medals)

          return cause;

        }

        if( count > 199  && count < 300){
          
         
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $inc: { points: -count }},
            { new: true }
          );

          await Cause.findByIdAndUpdate(
            {_id: args.causeId},
            { $inc: { points: count }},
            { new: true }
          )
          console.log(cause.medals)
          cause.medals.unshift({
            body: 'Silver',
            username: context.user.username,
            createdAt: new Date().toISOString()
          })
          await cause.save()
          console.log(cause.medals)

          return cause;

        }

        if( count > 299  && count < 500){
          
         
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $inc: { points: -count }},
            { new: true }
          );

          await Cause.findByIdAndUpdate(
            {_id: args.causeId},
            { $inc: { points: count }},
            { new: true }
          )
          console.log(cause.medals)
          cause.medals.unshift({
            body: 'Gold',
            username: context.user.username,
            createdAt: new Date().toISOString()
          })
          await cause.save()
          console.log(cause.medals)

          return cause;

        }
        if( count > 500){
          
         
          await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $inc: { points: -count }},
            { new: true }
          );

          await Cause.findByIdAndUpdate(
            {_id: args.causeId},
            { $inc: { points: count }},
            { new: true }
          )
          console.log(cause.medals)
          cause.medals.unshift({
            body: 'Platinum',
            username: context.user.username,
            createdAt: new Date().toISOString()
          })
          await cause.save()
          console.log(cause.medals)

          return cause;

        }


        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $inc: { points: -count }},
          { new: true }
        );

        await Cause.findByIdAndUpdate(
          {_id: args.causeId},
          { $inc: { points: count }},
          { new: true }
        )
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

      console.log(cause);

      if (cause) {
        cause.comments.unshift({
          body,
          createdAt: new Date().toISOString(),
        });

        await cause.save();

        return cause;
      }

      throw new UserInputError("Cause not found");
    },
    deleteUser: async (parent, args, context) => {
      const deletedUser = await User.findByIdAndDelete(args.userId)
      return deletedUser
    },
    deleteCause: async (parent, args, context) => {
      const deletedCause = await Cause.findByIdAndDelete(args.causeId)
      return deletedCause
    },
    deleteComment: async (parent, {causeId, commentId}, context) => {
      const cause = await Cause.findById(causeId)
      if(cause){
        const commentIndex = cause.comments.findIndex((c)=>{c.id===commentId})
        cause.comments.splice(commentIndex, 1)
        await cause.save()
      }
      return cause
    },
    updateUser: async (parent, args, context) => {
      if(context.user){
        if(args.username){
          console.log(args)
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {username: args.username},
          {new: true}
        )
        }
        if(args.password){
          const saltRounds = 12;
          const hash = await bcrypt.hash(args.password, saltRounds)
          console.log(args)
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {password: hash},
          {new: true}
        )
        }
        if(args.email){
          console.log(args)
        return await User.findByIdAndUpdate(
          {_id: context.user._id},
          {email: args.email},
          {new: true}
        )
        }
        
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateCause: async (parent, args, context) => {
      if(context.user){
        if(args.causeId){
          if(args.title){
            console.log(args)
          return await Cause.findByIdAndUpdate(
            {_id: args.causeId},
            {title: args.title},
            {new: true}
          )
          }
          if(args.description){
            console.log(args)
          return await Cause.findByIdAndUpdate(
            {_id: args.causeId},
            {description: args.description},
            {new: true}
          )
          }
          if(args.url){
            console.log(args)
          return await Cause.findByIdAndUpdate(
            {_id: args.causeId},
            {url: args.url},
            {new: true}
          )
          }
          if(args.location){
            console.log(args)
          return await Cause.findByIdAndUpdate(
            {_id: args.causeId},
            {location: args.location},
            {new: true}
          )
          }
          if(args.category){
            console.log(args)
          return await Cause.findByIdAndUpdate(
            {_id: args.causeId},
            {category: args.category},
            {new: true}
          )
          }
          
        }
        throw new UserInputError("No cause found with this ID!");
      }
      throw new AuthenticationError("You need to be logged in!");
    }
  }
};

module.exports = resolvers;
