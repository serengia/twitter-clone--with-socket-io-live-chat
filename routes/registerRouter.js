const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("register", { pageTitle: "Register" });
});

router.post("/", authController.register);

module.exports = router;
