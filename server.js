const express = require("express"); /* import thư viện Express */
const app = express(); /* khởi tạo ứng dụng Express */
const bcrypt = require("bcrypt"); /* import thư viện bcrypt */

app.set("views", "./views"); /* thiết lập thư mục views */
app.set("view engine", "ejs"); /* thiết lập EJS làm engine view */
app.use(express.static("public")); /* phục vụ các tệp tĩnh từ thư mục "public" */

app.get("/", (req, res) => {
  res.render("notindex"); /* render tệp views/notindex.ejs */
});

app.listen(6969, () => {
  console.log("Server running on http://localhost:6969");
});
