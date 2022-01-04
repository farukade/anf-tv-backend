var express = require('express');
var router = express.Router();
var userController = require('../controllers/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Create new user
router.post('/create-user', userController.userControllers.createUser);

// Get All Users
router.get('/get-users', userController.userControllers.getAllUsers);

// Get Single User
router.get('/get-user/:id', userController.userControllers.getOneUser);

// Get Single User
router.delete('/delete-user/:id', userController.userControllers.deleteUser);

// Update user details
router.put('/update-user/:id', userController.userControllers.updateUser);

module.exports = router;
