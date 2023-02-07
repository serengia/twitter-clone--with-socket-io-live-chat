const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).render("register");
});

router.post("/", (req, res, next) => {
  console.log("CHECKING THE BODY");
  console.log(req.body);
  const firstName = req.body.firstName.trim();
  const lastName = req.body.lastName.trim();
  const username = req.body.username.trim();
  const email = req.body.email.trim();
  const password = req.body.password;

  if (!firstName || !lastName || !username || !email || !password) {
    const payload = req.body;
    payload.password = null;
    payload.errorMessage = "Please provide all the values.";
    res.status(200).render("register", payload);
  }

  res.status(200).render("register", payload);
});

module.exports = router;
