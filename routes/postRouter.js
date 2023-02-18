const express = require("express");

const { isAuthenticated } = require("../middleware/middleware");

const router = express.Router();

router.get("/:id", isAuthenticated, (req, res) => {
  const payload = {
    pageTitle: "View page",
  };
  res.status(200).render("postPage", payload);
});

module.exports = router;
