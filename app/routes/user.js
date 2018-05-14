const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// router.route('/')
    // .get(userCtrl.find)
    // .post(userCtrl.create);

router.route('/:id')
    .get(userCtrl.findOne)
    //.put(userCtrl.update)
    //.delete(userCtrl.delete);

module.exports = router;