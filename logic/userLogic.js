const Product = require('../models/Product');
const Cart = require('../models/Cart');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

exports.userCart = async (req, res, next) => {
  try {
    const userId = req.currentUser._id;
    const productId = req.params.id;
    const quantity = +req.params.quantity;
    const { price } = await Product.findById(productId).select(
      '-category -name -image -description -brand -countInStock'
    );

    let userCart = await Cart.findOne({ user: userId });

    // User don't have a cart:
    if (!userCart) {
      const newCart = await Cart({
        user: userId,
        cart: [{ productId, quantity, price: price * quantity }],
        sum: price * quantity,
      });
      await newCart.save();
      return res.status(200).json(newCart);
    }

    // User already have a cart:
    const productExists = userCart.cart.find(
      (cart) => cart.productId === productId
    );
    const productExistsIndex = userCart.cart.findIndex(
      (cart) => cart.productId === productId
    );

    // Product already exists in the cart:
    if (productExists) {
      productExists.quantity = productExists.quantity + quantity;
      productExists.price = price * productExists.quantity;
      userCart.cart[productExistsIndex] = productExists;

      let sum = 0;
      for (let product of userCart.cart) {
        sum = sum + product.price;
      }

      const updated = await Cart.findOneAndUpdate(
        { user: userId },
        { cart: userCart.cart, sum },
        { new: true }
      );
      return res.status(200).json(updated);
    }

    // Product doesn't exists in the cart:
    const updateCart = [
      { productId, quantity, price: price * quantity },
      ...userCart.cart,
    ];
    const updateSum = userCart.sum + price * quantity;
    const updated2 = await Cart.findOneAndUpdate(
      { user: userId },
      { cart: updateCart, sum: updateSum },
      { new: true }
    );

    res.status(200).json(updated2);
  } catch (error) {
    next(error);
  }
};

exports.removeProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const userId = req.currentUser._id;
    const userCart = await Cart.findOne({ user: userId });

    const updateCart = userCart.cart.filter(
      (product) => product.productId !== productId
    );
    const sumToSubtract = userCart.cart.find(
      (product) => product.productId === productId
    );
    const updateSum = userCart.sum - sumToSubtract.price;

    const update = await Cart.findOneAndUpdate(
      { user: userId },
      { cart: updateCart, sum: updateSum },
      { new: true }
    );

    res.status(200).json(update);
  } catch (error) {
    next(error);
  }
};
