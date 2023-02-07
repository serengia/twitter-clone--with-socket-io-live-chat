exports.getTweets = async (req, res, next) => {
  res.status(200).json({
    message: "Tweets page",
  });
};
