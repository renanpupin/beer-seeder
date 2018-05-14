const mongooseUtils = require("../utils/mongoose");

const UserSchema = require("../models/user");

module.exports = {
    login: async (req, res, next) => {
        //sample user
        const user = {
            email: 'admin',
            password: '123456'
        };

        if (req.body.email === user.email && req.body.password === user.password) {
            return res.json({
                success: true,
                message: "Logged in"
            });
        }else{
            return res.json({
                success: false,
                message: "Unauthorized"
            });
        }
    },
    register: async (req, res, next) => {

        try{

            let newUser = new UserSchema({
                email: req.body.email,
                password: req.body.password
            })

            let user = await mongooseUtils.save(newUser);

            return res.json({
                success: true,
                message: "Registered.",
                user: user
            });
        }catch(e){
            return res.json({
                success: false,
                message: e.message
            });
        }
    }
}