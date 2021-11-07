const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const app = require("./app");

// CONNECT MONGO
const DB = process.env.DB.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD,
).replace("<USERNAME>", process.env.DB_USERNAME);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log("DB connection successful"));

// CONNECT EXPRESS
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}...`);
});
