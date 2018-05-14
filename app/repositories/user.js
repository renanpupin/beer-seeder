const mongooseUtils = require("../utils/mongoose");

const UserSchema = require("../models/user");

//TODO: let use default generic routes (REST)

module.exports = {
    findOne: async ( query, populate = '' ) => {
      return await mongooseUtils.findOne( UserSchema )( query, populate );
    },
}