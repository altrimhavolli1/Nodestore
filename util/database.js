const mongoose = require("mongoose");
const User = require("../models/user.js");

mongoose.connect("mongodb://localhost:27017/nodeStore", {
  useNewUrlParser: true,
});

const connect = mongoose.connection;

connect.on("connected", () => {
  console.log("database is connected successfully");
});
connect.on("disconnected", () => {
  console.log("database is disconnected successfully");
});

connect.on("error", console.error.bind(console, "connection error:"));
module.exports = connect;
