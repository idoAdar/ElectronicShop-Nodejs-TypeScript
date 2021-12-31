const express = require('express');
const isAuth = require('../utills/isAuth');
const {
  getProducts,
  getProduct,
  userCart,
  removeProduct,
} = require('../logic/userLogic');

const route = express.Router();

// Url: http://localhost:5000/user/all
// Method: GET
// Desc: Fetch all products
// Security: Public
route.get('/all', getProducts);

// Url: http://localhost:5000/user/product/:id
// Method: GET
// Desc: Fetch product by id
// Security: Public
route.get('/product/:id', getProduct);

// Url: http://localhost:5000/user/cart/:id/:quantity
// Method: POST
// Desc: Insert to cart
// Security: Private
route.post('/cart/:id/:quantity', isAuth, userCart);

// Url: http://localhost:5000/user/cart-remove/:productId
// Method: DELETE
// Desc: Remove from cart
// Security: Private
route.delete('/cart-remove/:productId', isAuth, removeProduct);

module.exports = route;
