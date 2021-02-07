const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Customer = require('../../models/Customer');

// @route    POST api/customer
// @desc     Post customer
// @access   Private
router.post('/', async (req, res) => {
  try {
    let data = {
      ...req.body,
      history: []
    }
    let customer = new
      Customer(data)
    await customer.save()

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});
// @route    PUT api/customer
// @desc     EDIT customer
// @access   Private
router.put('/:customer_id', async (req, res) => {
  try {
    console.log(req.params.customer_id);
    let customer_id = req.params.customer_id
    const customer = await Customer.findOneAndUpdate({ _id: customer_id }, req.body)
    res.send("Customer Edited")
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    Delete api/customer
// @desc     Delete customer
// @access   Private
router.delete('/:customer_id', async (req, res) => {
  try {
    console.log(req.params.customer_id);
    let customer_id = req.params.customer_id
    const customer = await Customer.findOneAndRemove({ _id: customer_id })
    res.send("Customer Deleted")
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    GET api/customer
// @desc     Get All customer
// @access   Private
router.get('/', async (req, res) => {
  try {

    const customer = await Customer.find()

    res.json(customer)
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});




module.exports = router;
