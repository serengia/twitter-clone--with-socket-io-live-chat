const express = require("express");

const router = express.Router();
const postController = require("../../controllers/postController");
const retweetController = require("../../controllers/retweetController");

router.get("/", postController.getPosts);
router.post("/", postController.createPost);
router.patch("/:id/like", postController.updatePostLikes);

router.post("/:id/retweet", retweetController.retweet);

module.exports = router;
