var express = require('express');
var router = express.Router();
var userController = require('../controllers/users');
var authController = require('../controllers/auth');
const { jwtAuth } = require("../middleware/auth");
var cors = require('cors');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500/"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Create new user
router.post('/create-user', jwtAuth.verifyUser, authController.authController.addUser);

// Create new user
router.post('/sign-in', authController.authController.signIn);

// Get All Users
router.get('/get-users', userController.userControllers.getAllUsers);

// Get Single User
router.get('/get-user/:id', jwtAuth.verifyUser,   userController.userControllers.getOneUser);

// Get Single User
router.delete('/delete-user/:id', jwtAuth.verifyUser,  userController.userControllers.deleteUser);

// Update user details
router.put('/update-user/:id', jwtAuth.verifyUser,  userController.userControllers.updateUser);

module.exports = router;
