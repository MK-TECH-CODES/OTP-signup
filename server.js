const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./dbconnection/db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "guest.html"));
});

app.use("/data/signup", require("./route/register"));

app.get("/forgot-password", (req, res) => {
  res.render("forget");
});

app.use("/verify/otp", require("./route/send_otp"));

app.use("/change", require("./route/update_password"));

app.use("/reset-password", require("./route/reset"));

app.use("/data/signin", require("./route/login"));

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});
