const db = require('../models/index')
const users = db.users


exports.userControllers = {
  createUser: (req, res) => {
    const user = req.body;

    users
      .create(user)
        .then((data) => {
          res
            .status(200)
            .send({
              message: "Success",
              data: data
            })
        })
        .catch((err) => {
          res
            .status(400)
            .send(err)
        })

  }, 
  updateUser: (req, res) => {
    const userId = req.params.id;
    const user = req.body;

    users
      .update(user, {
        where: {
          id: userId
        }
      })
      .then((data) => {
        if(data[0] !== 1) {
          res.status(400).send({
            message: "Record not found",
          });
        }
        res
          .status(200)
          .send({
            message: "User Updated"});
      })
      .catch((err) => {
        res
          .status(400)
          .send(err)
      })
  }, 
  getAllUsers: (req, res) => {
    users
      .findAll()
        .then((data) => {
          res
            .status(200)
            .send(data)
        })
        .catch((err) => {
          res
            .status(400)
            .send(err)
        })
  },
  getOneUser: (req, res) => {
    const userId = req.params.id;

    users
      .findOne({
        where: {
          id: userId
        }
      })
        .then((data) => {
          res
            .status(200)
            .send(data)
        })
        .catch((err) => {
          res
            .status(400)
            .send(err)
        })
  },
  deleteUser: (req, res) => {
    const userId = req.params.id;

    users
      .destroy({
        where: {
          id: userId
        }
      })
      .then((data) => {
        if (data !== 1) {
            res
              .status(400)
              .send({
              message: "Record not found"
            });
          }
        res
          .status(200)
          .send({
            message: "User deleted"});
      })
      .catch((err) => {
        res
          .status(400)
          .send(err);
      });
  }
}