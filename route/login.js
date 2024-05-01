const router = require("express").Router();
const db = require("../dbconnection/db");

router.post("/", async (req, res) => {
  const { name, pswd } = req.body;

  const response = await db.login_page(name, pswd);
  console.log(response[0].count);

  if (response[0].count === "1") {
    res.render("success");
  } else {
    res.status(500).send("Invalid User Name and Password....");
  }
});

module.exports = router;
