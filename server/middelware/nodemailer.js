const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const request = require("request");
const { json } = require("body-parser");
let axios = require("axios");

// async..await is not allowed in global scope, must use a wrapper
class SendMails {
  async main(body) {
    let { to, subject, text } = body;

    let token = jwt.sign({ to }, "confirmEmail", { expiresIn: "24h" });

    let location = "http://ewdtech.com:3000/";

    let html = `<div style="
            background: #f2f2f2;
            height: 650px;
            padding-top: 50px;
        ">
        
            <div style="
                    background: #fefefe;
                    height: 600px;
                    width: 650px;
                    margin: auto;
                ">
        
        
                    <div style="
                            height: 100px;
                            padding: 30px 0px;
                            text-align: center;
                            font-size: 4rem;
                            font-weight: 600;
                            text-shadow: 2px 5px 6px #636363;
                        ">
                        <span style="
                            color: #00b074;
                        ">EALLAINE</span>
                        <span>RECRUITMENT</span>
                    </div>
                        <div style="
                            height: 420px;
                            text-align: center;
                        ">
                            <p style="
                                font-size: 1rem;
                                color: #848484;
                            ">Hi there!</p>
                            <p style="
                                font-size: 1rem;
                                    color: #848484;
                                    margin-bottom: 50px;
                                ">Activate your Account
                            </p>
                            <a style="
                                    font-size: 20px;
                                    background: #00b074;
                                    padding: 10px 15px;
                                    color: white;
                                    border-radius: 5px;
                                    cursor: pointer;
                                    text-decoration: none;
                                "
                                href="${location}activate-account/${token}"
                                title="Activate Account" target="_blank"
        
                                >Activate Account</a>
                            <p style="
                                margin-top: 5rem;
                                font-size: 1rem;
                                color: #848484;
                            ">If you're having trouble clicking the button, copy the url and paste into your web broswer</p>
                            <p style="
                                font-size: 0.90rem;
                                color: #335ece;
                                text-decoration: underline;
                            ">${location}activate-account/${token}</p>
        
                        </div>
                    </div>
            </div>
        </div>`; // html body

    let data = {
      html,
      subject,
      sendTo: to,
      text,
    };
    axios
      .post("https://gullidanda.herokuapp.com/send_mail", data)
      .then((data) => {
        console.log(data);
      });
  }
  async forgotPassword(email) {
    let token = jwt.sign({ email }, "forgettingPassword", { expiresIn: "24h" });

    let location = "http://ewdtech.com:3000/";
    // let location = "http://localhost:3000/";

    let html = `<div style="
    background: #f2f2f2;
    height: 650px;
    padding-top: 50px;
">

    <div style="
            background: #fefefe;
            height: 600px;
            width: 650px;
            margin: auto;
        ">


            <div style="
                    padding: 30px 0px;
                    text-align: center;
                    font-size: 4rem;
                    font-weight: 600;
                    text-shadow: 2px 5px 6px #636363;
                ">
                <span style="
                    color: #00b074;
                ">EALLAINE</span>
                <span>RECRUITMENT</span>
            </div>
                <div style="
                    height: 420px;
                    text-align: center;
                ">
                
                    <a style="
                            font-size: 20px;
                            background: #00b074;
                            padding: 10px 15px;
                            color: white;
                            border-radius: 5px;
                            cursor: pointer;
                            text-decoration: none;
                        "
                        href="${location}forgot-password/${token}"
                        title="Change Password" target="_blank"

                        >Change Password</a>
                    <p style="
                        margin-top: 5rem;
                        font-size: 1rem;
                        color: #848484;
                    ">If you're having trouble clicking the button, copy the url and paste into your web broswer</p>
                    <p style="
                        font-size: 0.90rem;
                        color: #335ece;
                        text-decoration: underline;
                    ">${location}forgot-password/${token}</p>

                </div>
            </div>
    </div>
</div>`; // html body

    let data = {
      html,
      subject: "Reset Password Instructions",
      sendTo: email,
      text: "Reset Password details",
    };
    axios
      .post("https://gullidanda.herokuapp.com/send_mail", data)
      .then((data) => {
        return data;
      });
  }
}

module.exports = new SendMails();
