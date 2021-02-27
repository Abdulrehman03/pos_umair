const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  customer: {

  },
  products: [
    {
      _id: {
        type: String,
        required: true,
      },
      barcode: {
        type: Number,
        required: true
      },
      product_name: {
        type: String,
        required: true
      },
      sale_price: {
        type: Number,
        required: true,
      },
      cost_price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      selected_quantity: {
        type: Number,
        required: true
      },
      total_price: {
        type: Number,
        required: true
      },
      date_created: {
        type: Date,
        required: true
      },
    }
  ],
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
