const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');

router
	.post('/register', authCtrl.register)
	.post('/login', authCtrl.login);

module.exports = router;

// TODO: implement inversion of control
// https://medium.com/@osuissa/node-js-express-refatorando-suas-rotas-9e322273feb