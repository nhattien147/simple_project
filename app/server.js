const express = require("express"); // Import Express framework
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing
const session = require("express-session"); // Import session middleware

const app = express();
const PORT = 6969;

// Mock user credentials
const testUser = "tien";
const testPassword = "tien";

// --- App Configuration ---
app.set("views", "./views"); // Set directory for template files
app.set("view engine", "ejs"); // Set EJS as the template engine

// --- Middleware ---
app.use(express.static("public")); // Serve static files from the "public" folder
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded form data
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // Session persists for 60 seconds
  })
);

// --- Routes ---

// Login page (GET)
app.get("/", (req, res) => {
  const error = req.session.error || null;
  delete req.session.error; // Clear error message after retrieving it
  res.render("notindex", { error: error }); // Render views/notindex.ejs
});

// Login logic (POST)
app.post("/", async (req, res) => {
  if (req.body.username === testUser && req.body.password === testPassword) {
    delete req.session.error; // Remove error if login is successful
    res.redirect("/afterlogin");
  } else {
    req.session.error = "Wrong Username or Password!";
    res.redirect("/");
  }
});

// Success page
app.get("/afterlogin", (req, res) => {
  res.render("afterlogin"); // Render views/afterlogin.ejs
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});