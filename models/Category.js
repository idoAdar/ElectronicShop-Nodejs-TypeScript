const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryScheme = new Schema({
  group: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Category', categoryScheme);
