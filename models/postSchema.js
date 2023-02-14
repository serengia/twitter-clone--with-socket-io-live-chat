const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: { type: String, trim: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pinned: Boolean,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;