const bcrypt = require("bcrypt");

const User = require("../models/userSchema");

exports.register = async (req, res, next) => {
  const firstName = req.body.firstName.trim();
  const lastName = req.body.lastName.trim();
  const username = req.body.username.trim();
  const email = req.body.email.trim();
  const password = req.body.password;

  if (!firstName || !lastName || !username || !email || !password) {
    const payload = req.body;
    payload.password = null;
    payload.errorMessage = "Please provide all the values.";
    return res.status(400).render("register", payload);
  }

  const foundUser = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (foundUser) {
    console.log("That email is already in use.");
    return res.status(400).render("register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  //   Save to db
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });

  // Update user session
  req.session.user = user;

  res.status(300).redirect("/");
};

// Login
exports.login = async (req, res, next) => {
  try {
    const inputValue = req.body.logUsername;
    const password = req.body.logPassword;

    if (!inputValue?.trim() || !password?.trim()) {
      return res.status(400).render("login");
    }

    const user = await User.findOne({
      $or: [{ username: inputValue }, { email: inputValue }],
    });

    if (!user) {
      console.log("Password", "email/username is incorrect");
      return res.status(400).render("login");
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(403).render("login");
    }

    // Update user session
    req.session.user = user;

    res.status(200).redirect("/");
  } catch (err) {
    console.log(err);
  }
};

// Log out
exports.logout = async (req, res, next) => {
  if (req.session) {
    // destroy user session
    req.session.destroy(() => {
      res.redirect("/login");
    });
  }
};
