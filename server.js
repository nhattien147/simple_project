const express = require("express"); /* import thư viện Express */
const app = express(); /* khởi tạo ứng dụng Express */
const bcrypt = require("bcrypt"); /* import thư viện bcrypt */
const session = require("express-session"); /* import express-session */

const testUser = "tien";
const testPassword = "tien";

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 } /* session tồn tại 60 giây */,
  })
);

app.use(
  express.urlencoded({ extended: false })
); /* phân tích cú pháp các biểu mẫu URL-encoded */

app.set("views", "./views"); /* thiết lập thư mục views */
app.set("view engine", "ejs"); /* thiết lập EJS làm engine view */
app.use(
  express.static("public")
); /* phục vụ các tệp tĩnh từ thư mục "public" */

app.get("/", (req, res) => {
  const error = req.session.error || null;
  delete req.session.error; /* xóa message sau khi đã lấy */
  res.render("notindex", { error: error }); /* render tệp views/notindex.ejs */
});

app.post("/", async (req, res) => {
  if (req.body.username === testUser && req.body.password === testPassword) {
    console.log("Login success:", req.body.username);
    delete req.session.error; /* xóa lỗi nếu có */
    res.redirect("/afterlogin");
  } else {
    req.session.error = "Wrong Username or Password!";
    res.redirect("/");
  }
});

app.get("/afterlogin", (req, res) => {
  res.render("afterlogin"); /* render tệp views/afterlogin.ejs */
});

app.listen(6969, () => {
  console.log("Server running on http://localhost:6969");
});
