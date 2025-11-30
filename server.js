const express = require("express"); /* import thư viện Express */
const app = express(); /* khởi tạo ứng dụng Express */
const bcrypt = require("bcrypt"); /* import thư viện bcrypt */

const testUser = "tien";
const testPassword = "tien";

app.use(
  express.urlencoded({ extended: false })
); /* phân tích cú pháp các biểu mẫu URL-encoded */

app.post("/login", async (req, res) => {
  if (req.body.username === testUser && req.body.password === testPassword) {
    console.log(testPassword);
    console.log(testUser);
    res.redirect("/afterlogin"); /* chuyển hướng nếu đăng nhập thành công */
  }
});

app.set("views", "./views"); /* thiết lập thư mục views */
app.set("view engine", "ejs"); /* thiết lập EJS làm engine view */
app.use(
  express.static("public")
); /* phục vụ các tệp tĩnh từ thư mục "public" */

app.get("/", (req, res) => {
  res.render("notindex"); /* render tệp views/notindex.ejs */
});

app.get("/afterlogin", (req, res) => {
  res.render("afterlogin"); /* render tệp views/afterlogin.ejs */
});

app.listen(6969, () => {
  console.log("Server running on http://localhost:6969");
});
