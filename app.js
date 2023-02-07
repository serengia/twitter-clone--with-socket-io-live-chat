const express = require("express");
const morgan = require("morgan");
const path = require("path");
const router = require("./routes");

const loginRoutes = require("./routes/loginRoutes");

const app = express();

app.use(morgan("dev"));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use("/login", loginRoutes);
app.use("/api/v1", router);

app.use("/", (req, res, next) => {
  const payload = {
    page: "Home page",
  };
  res.status(200).render("home", payload);
});

const PORT = 3004;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
