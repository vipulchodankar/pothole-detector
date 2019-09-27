const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

// DB Config
const db = require("./config/keys").MongoURI;

// MongoDB Connection
mongoose
  .connect(db, { useNewUrlParser: false })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// EJS SETUP
app.use(expressLayouts);
app.set("view engine", "ejs");

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));

// Express Session
// app.use(
//   session({
//     secret: "keyboard",
//     resave: true,
//     saveUnitialized: true
//   })
// );

// Connect Flash
// app.use(flash());

// Global Vars
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash("success_msg");
// });

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 4200;

app.listen(PORT, function() {
  console.log(`Application is running at http://localhost:${PORT}/`);
});
