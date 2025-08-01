const express = require("express");
const app = express();

app.set("view engine", "ejs");

const router = require("./router");

app.use("/", router);

app.listen(5000, () => {
  console.log("SERVER corriendo en http://localhost:5000");
});
