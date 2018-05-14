const UserRepository = require("../repositories/user");

module.exports = {
    findOne: async (req, res, next) => {
      try{
        let user = await UserRepository.findOne( { _id: req.params.id } );

        if (user) {
          return res.json({
              success: true,
              message: "User found",
              user: user
          });
        }else{
            throw new Error("User not found");
        }
      }catch(e){
          return res.json({
              success: false,
              message: e.message
          });
      }
    },
}