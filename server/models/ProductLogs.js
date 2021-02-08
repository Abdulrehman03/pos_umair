const mongoose = require("mongoose");
const ProductLogsSchema = new mongoose.Schema({
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
module.exports = mongoose.model("product_logs", ProductLogsSchema);
