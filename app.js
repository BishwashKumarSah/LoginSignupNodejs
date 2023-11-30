const express = require("express");
const path = require("path");

const authRoutes = require("./routes/authRoutes");

const { connectToDB } = require("./connection");

const app = express();

//middleware
app.use(express.static("public"));

//view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//database connection
const url =
  "mongodb+srv://bishwash:bishwash123@cluster0.rj8s1m7.mongodb.net/node-auth";

connectToDB(url)
  .then(() => {
    console.log("database connected");
    app.listen(3000);
  })
  .catch((err) => console.log("Couldn't connect to database"));

app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use("/users", authRoutes);
