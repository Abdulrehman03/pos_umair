const mongoose = require("mongoose");
const TransactionLogsSchema = new mongoose.Schema({
  CUSTOMER: {
    type: Object
  },
  SALE_id: {
    type: String
  },
  PAYMENT: {
    type: String
  },
  TIMESTAMP: {
    type: Date,
    default: Date.now
  }
});
module.exports  = mongoose.model("transaction_logs", TransactionLogsSchema)