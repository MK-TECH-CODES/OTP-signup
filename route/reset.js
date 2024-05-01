const router = require("express").Router();
const db = require("../dbconnection/db");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const new_password = req.body.new_password;
  const confirm_password = req.body.confirm_password;

  const response = await db.update_password(email, confirm_password);
  if (response.success) {
    res.render("login");
  } else {
    res.render("change_password", { email });
  }
});

module.exports = router;
