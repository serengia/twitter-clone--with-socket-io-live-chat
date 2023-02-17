const Post = require("../models/postSchema");
const User = require("../models/userSchema");

async function getPosts(filterObj) {
  try {
    let results = await Post.find(filterObj)
      .populate("postedBy")
      .populate("retweetData")
      .populate("replyTo")
      .sort({ createdAt: -1 });

    results = await User.populate(results, {
      path: "replyTo.postedBy",
    });

    return await User.populate(results, {
      path: "retweetData.postedBy",
    });
  } catch (error) {
    console.log(error);
  }
}

exports.createPost = async (req, res, next) => {
  if (!req.body.content) {
    console.log("Content param not sent with request");
    return res.sendStatus(400);
  }

  const postData = {
    content: req.body.content,
    postedBy: req.session.user,
  };

  if (req.body.replyTo) postData.replyTo = req.body.replyTo;

  const newPost = await Post.create(postData);

  if (!newPost) {
    res.sendStatus(400);
  }
  const populatedPost = await User.populate(newPost, { path: "postedBy" });

  res.status(201).send(populatedPost);
};

exports.getAllPosts = async (req, res) => {
  try {
    const results = await getPosts({});
    res.status(200).send(results);
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

exports.getSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await getPosts({ _id: id });
    res.status(200).send(post[0]);
  } catch (error) {
    res.sendStatus(400);
  }
};
