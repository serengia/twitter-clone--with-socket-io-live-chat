const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("login");
});

router.post("/", authController.login);

module.exports = router;
