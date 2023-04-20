const db = require("../models");
const User = db.user;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  User.findOne({
    _id: res.userId
  }).exec((err, user) => {res.status(200).send(user.email)})
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
