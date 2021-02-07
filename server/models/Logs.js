const mongoose = require("mongoose");
const LogsSchema = new mongoose.Schema({
  PRODUCT_NAME: {
    type: String
  },
  QUANTITY: {
    type: String
  },
  TIMESTAMP: {
    type: Date,
    default: Date.now
  }
});
module.exports = Logs = mongoose.model("logs", LogsSchema);
