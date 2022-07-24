const db = require("../models");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const Users = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send({
      message: "Name,E-Mail and Password can not be empty!",
    });
    return;
  }

  // password encryption
  let salt = bcrypt.genSalt(10);
  let hashPass = bcrypt.hash(req.body.password, salt);
  console.log(hashPass, "hashpass");

  // Create a USER
  const user = {
    user_id: req.body.user_id,
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    password: hashPass,
  };

  // Save Users in the database
  Users.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the users.",
      });
    });
  send_mail(req.body.email);
};

// send mail function it can be used by using function send_mail and giving parameter mail
let send_mail = (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "farhank.99khan@gmail.com",
      pass: "cuyhbmfhotpknaqm",
    },
  });

  let mailOptions = {
    from: "farhank.99khan@gmail.com",
    to: email,
    subject: "Registration Successful",
    text: "Dear user!! Thank you for using Node_APP, we are really sure that you will love this!",
    html: '<p>To connect with me.<a href="www.instagram.com"> Login </a></p>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

// Get user from database to sign in with email password
exports.find = (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  let condition = email && password;

  Users.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving user.",
      });
    });
};
