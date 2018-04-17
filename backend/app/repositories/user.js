const mongooseUtils = require("../utils/mongoose");

const UserSchema = require("../models/user");

module.exports = {
    findOne: async ( query, populate = '' ) => {
      try{
        let user = await mongooseUtils.findOne( UserSchema )( query, populate );

        if (user) {
          return user;
        }else{
            throw new Error("User not found.");
        }
      }catch(e){
          return e;
      }
    },
}