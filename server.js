const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("notindex");
});

app.listen(6969, () => {
  console.log("Server running on http://localhost:6969");
});
