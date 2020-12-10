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
      //console.log("First function call : ", docs);
      var a = docs;
    }
    CandidateStatusModel.find(
      { _id: docs[1].candidateStatus },
      function (err, docs2) {
        if (err) {
          console.log(err);
        } else {
          console.log("First function call : ", docs2);
          var b = docs2;
        }

        res.render("dashboard", {
          user: req.user,
          docs: a,
          docs2: b,
        });
      }
    );
  });
});

router.get("/find", (req, res) => {
  const user = User.findOne();
  console.log(user);
  res.send(user);
});

module.exports = router;
