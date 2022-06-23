const causeResolvers = require("./cause");
const userResolvers = require("./user");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...causeResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...causeResolvers.Mutation,
  },
};
