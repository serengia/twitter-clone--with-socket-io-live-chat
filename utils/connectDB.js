const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to BB");
  } catch (error) {
    console.log("Failed to connect to DB");
  }
};
