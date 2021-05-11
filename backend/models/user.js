const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  saltSecret: {
    type: String,
  },
  lists: {
    type: Object,
    default: {
      todos: [],
      doing: [],
      done: [],
    },
  },
});

// Hash password before saving
UserSchema.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

// Methods
UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
};

module.exports = mongoose.model("User", UserSchema);
