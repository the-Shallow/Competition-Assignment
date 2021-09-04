const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have a eamil"],
  },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
