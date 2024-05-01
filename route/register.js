const router = require("express").Router();
const db = require("../dbconnection/db");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received data:", name, email, password);
  const response = await db.addUser(name, email, password);
  // Respond with the received data
  console.log(response);
  if (response.success) {
    res.render("login");
  } else {
    res.status(500).send("User is already present");
  }
});

module.exports = router;
