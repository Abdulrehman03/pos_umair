const express = require("express");
const axios = require("axios");
const router = express.Router();
const Logs = require("../../models/Logs");

//////////////////////
//////CREATE///////
//////LOGS//////////
//////////////////////



router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    let logs = new Logs(req.body);
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
    let logs = await Logs.find();
    res.send(logs);
  } catch (err) {
    console.log(err.message);
    res.status(400);
  }
});

module.exports = router;
