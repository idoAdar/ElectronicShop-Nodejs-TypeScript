const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartScheme = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  cart: {
    type: [],
    required: true,
  },
  sum: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('Cart', cartScheme);
