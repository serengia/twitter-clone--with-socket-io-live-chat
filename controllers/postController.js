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

exports.updatePostLikes = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!req.session.user) return;
    const userId = req.session.user._id;

    const isLiked = req.session.user.likes?.includes(postId);

    const option = isLiked ? "$pull" : "$addToSet";

    // Updating users' likes array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { [option]: { likes: postId } },
      { new: true }
    );

    if (updatedUser) req.session.user = updatedUser;

    // Updating posts' likes array
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { [option]: { likes: userId } },
      { new: true }
    );

    res.status(200).send(updatedPost);
  } catch (error) {
    console.log(error);

    res.status(400);
  }
};
