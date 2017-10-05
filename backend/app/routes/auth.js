import express from 'express';
import expressJwt from 'express-jwt';
import authCtrl from '../controllers/auth';
import config from '../../config/config';

const router = express.Router();

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
	.post(authCtrl.login);

export default router;