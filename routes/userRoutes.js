const userController = require('./../Controller/userController');
const express = require('express');

const router = express.Router();

router.post('/', userController.createUser);

module.exports = router;