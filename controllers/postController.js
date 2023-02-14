const Post = require("../models/postSchema");
const User = require("../models/userSchema");

exports.createPost = async (req, res, next) => {
  if (!req.body.content) {
    console.log("Content param not sent with request");
    return res.sendStatus(400);
  }

  const postData = {
    content: req.body.content,
    postedBy: req.session.user,
  };

  const newPost = await Post.create(postData);

  if (!newPost) {
    res.sendStatus(400);
  }
  const populatedPost = await User.populate(newPost, { path: "postedBy" });

  res.status(201).send(populatedPost);
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy")
      .sort({ createdAt: -1 });
    res.status(200).send(posts);
  } catch (error) {
    console.log(error);
  }
};
