const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Product = require('../../models/Product');

// @route    POST api/product
// @desc     Post product
// @access   Private
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    let product = new Product(req.body)
    await product.save()

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});
// @route    PUT api/product
// @desc     EDIT product
// @access   Private
router.put('/:product_id', async (req, res) => {
  try {
    console.log(req.params.product_id);
    let product_id = req.params.product_id
    const product = await Product.findOneAndUpdate({ _id: product_id }, req.body)
    res.send("Product Edited")
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    Delete api/product
// @desc     Delete product
// @access   Private
router.delete('/:product_id', async (req, res) => {
  try {
    console.log(req.params.product_id);
    let product_id = req.params.product_id
    const product = await Product.findOneAndRemove({ _id: product_id })
    res.send("Product Deleted")
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    GET api/product
// @desc     Get All product
// @access   Private
router.get('/', async (req, res) => {
  try {

    const product = await Product.find()

    res.json(product)
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});




module.exports = router;
