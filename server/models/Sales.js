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
  }
});

module.exports = mongoose.model('sale', SaleSchema);
