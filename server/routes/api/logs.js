const express = require("express");
const axios = require("axios");
const router = express.Router();
const ProductLogs = require("../../models/ProductLogs");
const TransactionLogs = require("../../models/TransactionLogs");

//////////////////////
//////CREATE///////
//////LOGS//////////
//////////////////////

router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    let logs = new ProductLogs(req.body);
    await logs.save();
    res.send("Logs added");
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ errors: [{ msg: "Logs Adding Failed" }] });
  }
});
//////////////////////
//////CREATE///////
//////TransactionLogs//////////
//////////////////////

router.post("/transaction", async (req, res) => {
  try {
    console.log(req.body)
    let logs = new TransactionLogs(req.body);
    await logs.save();
    res.send("Logs added");
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ errors: [{ msg: "Logs Adding Failed" }] });
  }
});

//////////////////////
//////GET ALL///////
//////logs//////////
//////////////////////
router.get("/", async (req, res) => {
  try {
    let logs = await ProductLogs.find();
    res.send(logs);
  } catch (err) {
    console.log(err.message);
    res.status(400);
  }
});
//////////////////////
//////GET ALL///////
//////TransactionLogs//////////
//////////////////////
router.get("/transaction", async (req, res) => {
  try {
    let logs = await TransactionLogs.find();
    res.send(logs);
  } catch (err) {
    console.log(err.message);
    res.status(400);
  }
});

module.exports = router;
