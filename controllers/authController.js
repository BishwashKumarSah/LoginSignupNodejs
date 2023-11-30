const login_get = (req, res) => {
  res.render("login");
};

const signup_get = (req, res) => {
  res.render("signup");
};

module.exports = { login_get, signup_get };
