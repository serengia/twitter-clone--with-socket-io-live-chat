const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("./routes");
const bodyParser = require("body-parser");

const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
const connectDB = require("./utils/connectDB");
const session = require("express-session");

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

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/api/v1", router);

app.use("/", (req, res, next) => {
  const payload = {
    page: "Home page",
    userLoggedIn: req.session.user,
  };
  res.status(200).render("home", payload);
});

const PORT = 3004;

app.listen(PORT, () => {
  connectDB();

  console.log(`Server started on port ${PORT}`);
});
