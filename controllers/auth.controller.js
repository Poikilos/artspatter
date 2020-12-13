var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;


exports.signup = (req, res) => {
  const user = new User({
    // uid: , // TODO: generate uid
    active: true,
    username: req.body.username,
    email: req.body.email,
    pln: 5,
    c: Date.now(), // should only have parenthesis upon creation not schema
    showFtns: [0, 1, 2],
    display: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          rid: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            console.log("+User FAILED get role(s) ", req.body.roles, err);
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              console.log("+User FAILED to save id ", user.id, err);
              return;
            }
            user.uid = user.id.toString();
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                console.log("+User FAILED to resave uid ", user.uid, err);
                return;
              }
              console.log("+User uid ", user.uid);
              res.send({ message: `User was registered successfully! uid: ${user.uid}` });
            });
          });
        }
      );
    } else {
      Role.findOne({ rid: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign(
        {
          id: user.id,
          uid: user.uid,
        },
        config.secret,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].rid.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        uid: user.uid,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};

// (BezKoder, 2019a)
