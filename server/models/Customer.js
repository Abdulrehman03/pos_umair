const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  CREATED_BY: {
    type: String
  },
  history: {},
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('customer', CustomerSchema);
