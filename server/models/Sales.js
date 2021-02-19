const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  customer: {

  },
  products: {

  },
  total_price: {
    type: String,
    required: true,
  },
  sale_profit: {
    type: String
  },
  pending_payment: {
    type: Number,
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  CREATED_BY: {
    type: String
  },
});

module.exports = mongoose.model('sale', SaleSchema);
