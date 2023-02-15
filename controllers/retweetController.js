const Post = require("../models/postSchema");
const User = require("../models/userSchema");

exports.retweet = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!req.session.user) return;
    const userId = req.session.user._id;

    // Try to delete, if successful, we un-retweet
    const deletedPost = await Post.findOneAndDelete({
      postedBy: userId,
      retweetData: postId,
    });

    const option = deletedPost ? "$pull" : "$addToSet";

    let retweet = deletedPost;

    if (!retweet) {
      retweet = await Post.create({ postedBy: userId, retweetData: postId });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { [option]: { retweets: retweet._id } },
      { new: true }
    );

    if (updatedUser) req.session.user = updatedUser;

    // Updating post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { [option]: { retweetUsers: userId } },
      { new: true }
    );

    // Updating users' likes array

    // Updating posts' likes array

    res.status(200).send(updatedPost);
  } catch (error) {
    console.log(error);

    res.status(400);
  }
};
