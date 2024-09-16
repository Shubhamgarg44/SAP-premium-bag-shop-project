const express = require('express');
const router = express.Router();
const userModel = require("../models/usermodel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generatetoken} = require("../utils/generatetoken")
const {registeruser,loginuser,logout} = require('../controllers/authcont') 

router.get('/', (req, res) => {
    res.send('its working');
});

router.post('/register',registeruser);

router.post("/login",loginuser)

// router.post("/logout", logout)

module.exports = router;
