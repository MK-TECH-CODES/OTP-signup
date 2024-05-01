// otp_verification.js
const router = require("express").Router();
const db = require("../dbconnection/db");

router.post("/", async (req, res) => {
  try {
    const { email, otp } = req.body;
    // console.log(email, otp);
    // res.status(200).send("Success");

    // // Check if the OTP provided by the user matches the one stored in the database
    const isOTPValid = await db.verifyOTP(email, otp);
    console.log(typeof isOTPValid[0].count);
    // res.status(200).json({ isOTPValid });

    if (isOTPValid[0].count === "1") {
      // If OTP is valid, render a page to reset password
      res.render("change_password", { email });
    } else {
      // If OTP is invalid, render an error page
      res.render("otp_data", { email });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
