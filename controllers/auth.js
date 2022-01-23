const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config()
const db = require('../models/index');
const users = db.users;

exports.authController = {
    addUser: (req, res) => {
        const user = req.body;
        user.password = bcrypt.hashSync(user.password, 10);
        users.create(user)
          .then((data) => {
            res.status(200)
               .send({
                 success: true, 
                 message: "Signup Successful",
                 data: data
                });
              })
            .catch((err) => {
                res.status(400)
                   .send(err);
                        });
    },
    signIn: (req, res) => {
        users.findOne({
          where: {
            userName: req.body.userName
        }})
          .then((user) => {
            if(!user) 
            return res.status(401)
                      .send({
                  message: "invalid username or password"
                });

            let isValidPassword = bcrypt.compareSync(req.body.password, user.password);
            if(!isValidPassword) 
            return res.status(401)
                      .send({
                  message: "Invalid username or password"
                });

            let payload = {
                id: user.id, 
                userName: user.userName,
                userType: user.userType
            };
            let token = jwt.sign(payload, process.env.secret, {expiresIn: 300000});

            res.status(200)
               .send({
                 message: "sign in successful", 
                 data: payload, 
                 accessToken: token})
        })
        .catch((err) => {
            res.status(400)
               .send({
                 error: err 
                })
        })
    },
    forgotPassword: () => {}
};