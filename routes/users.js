const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../models/User");
const { forwardAuthenticated } = require("../config/auth");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);

// Register
router.post("/register", (req, res) => {
  const { name, email, CPF, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !CPF || !password || !password2) {
    errors.push({ msg: "Por favor, insira todos os campos" });
  }

  if (password != password2) {
    errors.push({ msg: "As senhas não coincidem" });
  }

  if (password.length < 6) {
    errors.push({ msg: "A senha deve ter pelo menos 6 caracteres" });
  }

  if (CPF.length < 11) {
    errors.push({ msg: "CPF inválido" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      CPF,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email, CPF: CPF }).then((user) => {
      if (user) {
        errors.push({ msg: "Email ou CPF já existentes" });
        res.render("register", {
          errors,
          name,
          email,
          CPF,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          CPF,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "Você agora está registrado e pode fazer login"
                );
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Você está desconectado");
  res.redirect("/users/login");
});

module.exports = router;
