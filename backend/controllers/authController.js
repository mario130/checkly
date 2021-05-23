const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports.register = (req, res, next) => {
  let user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user.save((err, doc) => {
    if (err) {
      if (err.code === 11000) {
        res.status(422).json("Info not unique!");
      } else {
        return next(err);
      }
    }

    // res.send(doc);
    res.status(200).json({ token: user.generateJwt(), username: doc.username });
  });
};

module.exports.authenticate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return res.status(400).json(err);
    else if (user)
      return res
        .status(200)
        .json({ token: user.generateJwt(), username: user.username });
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.getAll = (req, res, next) => {
  User.find({}, (err, data) => {
    if (err) return next(err);
    res.status(200).send(data);
  });
};

module.exports.getById = (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, data) => {
    if (err) return next(err);
    res.status(200).send(data);
  });
};
