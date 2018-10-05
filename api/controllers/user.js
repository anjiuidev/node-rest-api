const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../../env');

const User = require('../models/user');

exports.get_all_users = (req, res, next) => {
  User.find().exec()
    .then(result => {
      res.status(200).json({
        user: result
      });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({
        "error": err
      });
    });
}

exports.signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(409).json({
          "message": "Email already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log("Error:", err);
            res.status(500).json({
              "error": err
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user.save()
              .then(result => {
                res.status(201).json({
                  "message": "User Created Successfully",
                  user: result
                });
              })
              .catch(err => {
                console.log("Error:", err);
                res.status(500).json({
                  "error": err
                });
              });
          }
        });
      }
    });
}

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).exec()
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(404).json({
            "error": "Invalid Email/Password"
          });
        }
        if (result) {
          let token = jwt.sign({ email: user.email, userId: user._id }, env.JWT_SECRET, { expiresIn: "1h" });
          return res.status(404).json({
            "message": "Authentication Successfull",
            token: token
          });
        }
        return res.status(401).json({
          "error": "Invalid Email/Password"
        });
      });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({
        "error": err
      });
    });
}

exports.get_single_user = (req, res, next) => {
  User.findById({ _id: req.params.userId }).exec()
    .then(result => {
      res.status(200).json({
        user: result
      });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({
        "error": err
      });
    });
}

exports.delete_user = (req, res, next) => {
  User.remove({ _id: req.params.userId }).exec()
    .then(result => {
      res.status(200).json({
        "message": "User Delted Successfully",
      });
    })
    .catch(err => {
      console.log("Error:", err);
      res.status(500).json({
        "error": err
      });
    });
}