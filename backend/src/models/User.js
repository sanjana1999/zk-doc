const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phoneNumber: String,
  privateKey: String,
});


const User = mongoose.model("User", userSchema);

User.createIndexes({
  phoneNumber: 1
})


module.exports = User;
