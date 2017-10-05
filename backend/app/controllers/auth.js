import jwt from 'jsonwebtoken';
import config from '../../config/env';

//sample user
const user = {
    email: 'admin',
    password: '123456'
};

function login(req, res, next) {
    if (req.body.email === user.email && req.body.password === user.password) {
        const token = jwt.sign({ email: user.email }, config.jwtSecret);

        return res.json({
            success: true,
            message: "Logged in"
            token: token,
            email: user.email
        });
    }else{
        return res.json({
            success: true,
            message: "Unauthorized"
        });
    }
}

export default { login };