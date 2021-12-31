const express = require('express');
const isAdmin = require('../utills/isAdmin');
const isAuth = require('../utills/isAuth');
const { newProduct, editProduct } = require('../logic/adminLogic');

const route = express.Router();

// Url: http://localhost:5000/admin/new-product
// Method: POST
// Desc: New product
// Security: Admin
route.post('/new-product', [isAuth, isAdmin], newProduct);

// Url: http://localhost:5000/admin/edit-product/:productId
// Method: PUT
// Desc: Edit product
// Security: Admin
route.put('/edit-product/:productId', [isAuth, isAdmin], editProduct);

module.exports = route;
