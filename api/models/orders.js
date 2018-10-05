const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    required: true,
    type: Number,
    default: 1
  }
});

module.exports = mongoose.model('Order', orderSchema);