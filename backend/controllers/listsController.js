const User = require("../models/user");

module.exports.getUserLists = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (err) return next(err);

    res.status(200).send(user.lists);
  });
};

module.exports.editLists = async (req, res, next) => {
  User.updateOne(
    { _id: req._id },
    {
      // IMPORTANT: a walk-around because updating array with save has a bug
      lists: req.body.newLists,
    }
  ).then((data, err) => {
    if (!err) {
      if (data === null) {
        return res.status(200).send("Not found");
      }
      return res.status(200).send(data);
    } else {
      res.status(400).send(err);
    }
  });
};
