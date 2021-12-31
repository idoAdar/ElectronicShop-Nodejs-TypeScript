const express = require('express');
const isAuth = require('../utills/isAuth');
const { signUp, signDetails, signIn } = require('../logic/authLogic');

const route = express.Router();

// Url: http://localhost:5000/auth/sign-up
// Method: POST
// Desc: Sign up
// Security: Public
route.post('/sign-up', signUp);

// Url: http://localhost:5000/auth/personal-details
// Method: PUT
// Desc: Sign personal details
// Security: Private
route.put('/personal-details', isAuth, signDetails);

// Url: http://localhost:5000/auth/sign-in
// Method: POST
// Desc: Sign in
// Security: Public
route.post('/sign-in', signIn);

module.exports = route;
