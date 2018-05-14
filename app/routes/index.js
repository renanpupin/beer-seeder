const express = require("express");
const userRoutes = require("./user");
const authRoutes = require("./auth");

const router = express.Router();

router.get('/', (req, res) => {
	res.json({success: true, message: "It works!"});
});

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;