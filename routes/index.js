const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CandidateStatusModel = require("../models/CandidateStatusModel");
const CandidateModel = require("../models/CandidateModel");

const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  CandidateModel.find({ cpf: req.user.CPF }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("First function call : ", docs);
      var a = docs;
    }
    res.render("dashboard", {
      user: req.user,
      docs: a,
    });
  });
});

router.get("/find", (req, res) => {
  const user = User.findOne();
  console.log(user);
  res.send(user);
});

module.exports = router;
