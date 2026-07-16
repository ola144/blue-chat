const mongoose = require("mongoose");

// Connection Logic
mongoose.connect(process.env.MONGO_CONN_STR);

// Connection State
const db = mongoose.connection;

// Check DB Connection
db.on("connected", () => {
  console.log("DB Connection Successful!");
});

db.on("error", () => {
  console.log("DB Connection Faield!");
});

module.exports = db;
