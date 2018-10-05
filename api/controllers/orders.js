const mongoose = require('mongoose');

const Order = require('../models/orders');
const Product = require('../models/products');

exports.get_all_orders = (req, res, next) => {
  Order.find()
    .select('product quantity _id')
    .populate('product', "name price _id")
    .exec()
    .then(result => {
      res.status(200).json({
        "count": result.length,
        "orders": result.map(order => {
          return {
            "_id": order._id,
            "product": order.product,
            "quantity": order.quantity,
            "request": {
              "type": "GET",
              "url": "http://localhost:4000/api/orders" + order._id
            }
          }
        })
      });
    }).catch(err => {
      console.log("Error:", err);
      res.status(500).json({
        "error": err
      });
    });
}

exports.post_order = (req, res, next) => {
  Product.findById({ _id: req.body.productId })
    .exec()
    .then(product => {
      if (!product) {
        res.status(201).json({
          "message": "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    }).then((result) => {
      console.log(result);
      res.status(201).json({
        "message": "Order Saved Successfully",
        "order": result
      });
    }).catch(err => {
      console.log("Error:", err);
      res.status(500).json({
        "error": err
      });
    });
}


exports.get_single_order = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .select('product quantity _id')
    .populate('product', "name price _id")
    .exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          "order": result
        });
      } else {
        res.status(404).json({
          "message": "No data Available for the Id"
        });
      }
    }).catch(err => {
      console.log("Error:", err);
      res.status(500).json({
        "error": err
      });
    });
}

exports.delete_order = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id }).exec()
    .then(result => {
      res.status(200).json({
        "result": result,
        "message": "Order Deleted Successfully"
      });
    }).catch(err => {
      console.log("Error:", err);
      res.status(500).json({
        "error": err
      });
    });
}