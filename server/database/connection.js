const mongoose = require("mongoose");
require("dotenv").config();
// const URI = process.env.MONGODB_URL;
const URI = "mongodb://127.0.0.1:27017/test";

main()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(URI);
}

module.exports = main();
