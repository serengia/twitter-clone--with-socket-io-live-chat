const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("login");
});

module.exports = router;
