const router = require("express").Router();
const sendMail = require("../services/emailservices");
const db = require("../dbconnection/db");

function generateRandomSixDigitNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

router.post("/", async (req, res) => {
  try {
    const email = req.body.email; // Access email from req.body
    const otp = generateRandomSixDigitNumber();

    const response = await db.addotp(email, otp);

    if (response.success) {
      sendMail({
        from: process.env.FROM_MAIL,
        to: email,
        subject: "FORGOT PASSWORD OTP",
        text: `Your One Time Password (OTP) is: ${otp}`,
        html: `<p>Your One Time Password (OTP) is: <strong>${otp}</strong></p>`,
      });

      res.render("otp_data", { email });
    } else {
      res.status(500).send("OTP IS INVALID");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
