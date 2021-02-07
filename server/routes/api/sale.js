const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Sales = require('../../models/Sales');

// @route    POST api/sale
// @desc     Post sale
// @access   Private
router.post('/', async (req, res) => {
  try {
    let sale = new Sales(req.body)
    await sale.save()
    res.json(sale);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});
// @route    PUT api/sale
// @desc     EDIT sale
// @access   Private
router.put('/:sale_id', async (req, res) => {
  try {
    console.log(req.params.sale_id);
    let sale_id = req.params.sale_id
    const sale = await Sales.findOneAndUpdate({ _id: sale_id }, req.body)
    res.send("Sale Edited")
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    Delete api/sale
// @desc     Delete sale
// @access   Private
router.delete('/:sale_id', async (req, res) => {
  try {
    console.log(req.params.sale_id);
    let sale_id = req.params.sale_id
    const sale = await Sales.findOneAndRemove({ _id: sale_id })
    res.send("Sale Deleted")
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

// @route    GET api/sale
// @desc     Get All sale
// @access   Private
router.get('/', async (req, res) => {
  try {

    const sale = await Sales.find()

    res.json(sale)
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});




module.exports = router;
