const config = require('../config/env');
const ioEmitter = require('socket.io-emitter')(config.redis);

const express = require("express");
const userRoutes = require("./user");
const authRoutes = require("./auth");

const router = express.Router();

router.get('/', async (req, res) => {
	res.json({success: true, message: "It works!"});
});

router.get('/message', async (req, res) => {
    await ioEmitter.emit('message', new Date());

    res.json({success: true, message: "Message sent"});
});

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;