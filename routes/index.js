const express = require("express");
const { getTweets } = require("../controllers");
const { isAuthenticated } = require("../middleware/middleware");

const router = express.Router();
router.get("/", isAuthenticated, getTweets);

module.exports = router;
