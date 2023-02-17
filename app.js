const express = require("express");
const morgan = require("morgan");
const path = require("path");

const session = require("express-session");
const bodyParser = require("body-parser");

const postRouter = require("./routes/api/postRouter");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const logoutRouter = require("./routes/logoutRouter");
const connectDB = require("./utils/connectDB");
const { isAuthenticated } = require("./middleware/middleware");

const app = express();
require("dotenv").config();

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Setting up sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/logout", logoutRouter);
app.use("/api/v1/posts", postRouter);

app.use("/", isAuthenticated, (req, res, next) => {
  const payload = {
    pageTitle: "Home page",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
  };
  res.status(200).render("home", payload);
});

const PORT = 3004;

app.listen(PORT, () => {
  connectDB();

  console.log(`Server started on port ${PORT}`);
});
