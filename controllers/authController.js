const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/User");

//Error handling for email and password field
const handleErrors = (err) => {
  const errors = { email: "", password: "" };
  const loginErrors = { error: "" };
  // console.log("message",err.message);
  // console.log("code",err.code);
  if (err.message === "Invalid Username or Password") {
    loginErrors.error = "Invalid Username or Password";
    return loginErrors;
  }
  if (err.code === 11000) {
    //check if the email already exists (code 11000 is for duplicate key error )
    errors.email = "That email already exists";
    return errors;
  }

  //email and password validation
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//create jwt
const maxAge = 3 * 60 * 60 * 24;
const handleCreateJWT = (id) => {
  return jwt.sign({ id }, "secretKey", {
    expiresIn: maxAge,
  });
};

//login request
const login_get = (req, res) => {
  res.render("login");
};

const login_post = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const jwt = handleCreateJWT(user._id);
        res.cookie("jwt", jwt, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(200).json({ users: "undefined" });
      } else {
        throw new Error("Invalid Username or Password");
      }
    } else {
      throw new Error("Invalid Username or Password");
    }
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
};

//signup request
const signup_get = (req, res) => {
  res.render("signup");
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    // console.log(user._id);  o/p = new ObjectId('656b2ef422728f32662933a4')
    const jwt = handleCreateJWT(user._id);
    res.cookie("jwt", jwt, { maxAge: maxAge * 1000, httpOnly: true });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    // console.log(errors);
    res.status(400).json({ errors });
  }
};

const logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/users/login");
};

module.exports = { login_get, signup_get, login_post, signup_post, logout_get };
