const User = require("../models/User");

const handleErrors = (err) => {
  
}

//login request
const login_get = (req, res) => {
  res.render("login");
};

const login_post = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  res.send("login");
};

//signup request
const signup_get = (req, res) => {
  res.render("signup");
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("error, user not created");
  }
};

module.exports = { login_get, signup_get, login_post, signup_post };
