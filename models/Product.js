const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Catagory',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('Product', productSchema);
