const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    require: true,
  },
  lastName: {
    type: String,
    trim: true,
    require: true,
  },
  username: {
    type: String,
    trim: true,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  profilePic: { type: String, default: "/images/user/default.jpg" },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
