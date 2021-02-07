const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  barcode: {
    type: Number,
    required: true,
    unique: true
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
  date_created: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('product', ProductSchema);
