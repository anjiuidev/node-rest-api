const mongoose = require('mongoose');
const Product = require('../models/products');

exports.get_all_products = (req, res, next) => {
  Product.find()
    .select('name price _id productImage')
    .exec()
    .then(result => {
      res.status(200).json({
        "count": result.length,
        "products": result
      });
    }).catch(err => {
      console.log("Error:", err);
      res.status(500).json({
        "error": err
      });
    });
}

exports.post_product = (req, res, next) => {
  console.log(req.file)
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });
  product.save().then(result => {
    console.log(result);
    res.status(201).json({
      "message": "Product Saved Successfully",
      "product": result
    });
  }).catch(err => {
    console.log("Error:", err);
    res.status(500).json({
      "error": err
    });
  });
}

exports.get_single_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id).exec()
    .then(result => {
      if (result) {
        res.status(200).json({
          "product": result
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

exports.update_product = (req, res, next) => {
  const id = req.params.productId;
  const data = {
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  }
  Product.update({ _id: id }, { $set: data }).exec()
    .then(result => {
      res.status(200).json({
        "result": result
      });
    }).catch(err => {
      console.log("Error:", err);
      res.status(500).json({
        "error": err
      });
    });
}

exports.delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id }).exec()
    .then(result => {
      res.status(200).json({
        "result": result
      });
    }).catch(err => {
      console.log("Error:", err);
      res.status(500).json({
        "error": err
      });
    });
}