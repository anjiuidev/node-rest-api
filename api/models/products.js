const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number
  },
  productImage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);