const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (!cookie) {
    res.redirect("/users/login");
  } else {
    jwt.verify(cookie, "secretKey", (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.redirect("/users/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  }
};

const currentUser =  (req, res, next) => {
  const cookie = req.cookies.jwt;
  if (cookie) {
    jwt.verify(cookie, "secretKey", async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        console.log(user);
        res.locals.user = user.email;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, currentUser };
