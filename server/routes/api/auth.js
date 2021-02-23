const express = require("express");
const router = express.Router();
const auth = require("../../../server/middelware/auth");
const bcrypt = require("bcryptjs");
const request = require("request");
const jwt = require("jsonwebtoken");
const User = require("../../../server/models/User");

const SendMails = require("../../../server/middelware/nodemailer");
let confirmation = {
  text: "Email Confirmation",
  subject: "Email Confirmation",
  to: "",
};

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    if (user.acc_status == 2) {
      return res.status(400).json({ msg: "Account is not activated yet" });
    }
    //JsonWebToken
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, "JWTSECRET", { expiresIn: 360000000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//Register User

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  confirmation.to = email;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    let date = new Date();
    user = new User({
      name,
      email,
      password,
      date,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    SendMails.main(confirmation);
    // res.send('admin Registered');

    //JsonWebToken

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, "JWTSECRET", { expiresIn: 360000000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});
//SEND MAILER
router.put("/verifying_account", async (req, res) => {
  const { token } = req.body;

  //  let token = req.body.token
  if (token) {
    console.log(token + "----");
    let decoded = jwt.verify(token, "confirmEmail");
    if (decoded.to) {
      await User.findOneAndUpdate(
        { email: decoded.to },
        { acc_status: 1 },
        (err, doc) => {
          if (!err) {
            res.json({ msg: "SUccess" });
          }
        }
      );
    }
  }
});
//FOrgot Password
router.post("/forgot_request", (req, res) => {
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (user) {
      SendMails.forgotPassword(email).then((resp) => {
        console.log(resp);
        res.status(200).json({ successMsg: "Email Has been Send." });
      });
    } else {
      throw res.status(200).json({ errorMsg: "Your Email didn't exist." });
    }
  });
});

router.post("/reset_password", async (req, res) => {
  let { token, password } = req.body;
  let decoded = jwt.verify(token, "forgettingPassword");
  let email = decoded.email;

  User.findOne({ email }).then((user) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // Store hash in your password DB.
        if (err) throw err;

        User.findOneAndUpdate(
          { email: decoded.email },
          {
            $set: {
              password: hash,
            },
          },
          (err, doc) => {
            console.log(doc._doc);

            if (err) {
            } else {
              request.post(
                {
                  headers: { "content-type": "application/json" },
                  url: "https://popexample.herokuapp.com/passwordChanged",
                  json: {
                    email: user.email,
                  },
                },
                function (error, response, body) { }
              );

              res.status(200).json(user);
            }
          }
        );
      });
    });
  });
});
//Get User
router.get("/load-user", auth, async (req, res) => {
  if (req.user) {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  } else {
    res.json({ msg: "Sucess" });
  }
});


// @route    GET api/sale
// @desc     Get All sale
// @access   Private
router.get('/', async (req, res) => {
  try {

    const user = await User.find()

    res.json(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});


router.put('/:user_id', async (req, res) => {
  try {
    console.log(req.params.user_id);
    let user_id = req.params.user_id
    const user = await User.findOneAndUpdate({ _id: user_id }, req.body)
    res.send("User Edited")
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});



module.exports = router;
