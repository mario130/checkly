const User = require("../models/user");

module.exports.getUserLists = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, data) => {
    if (err) return next(err);

    res.status(200).send(data.lists);
  });
};
