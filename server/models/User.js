const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
  },
  acc_status: {
    type: Number,
    enum: [1, 2], // 1 for activated account and 2 for deactivated account.
    default: 2,
  },
});
module.exports = User = mongoose.model("user", UserSchema);
