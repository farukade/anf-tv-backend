var express = require('express');
var router = express.Router();
var newsController = require('../controllers/news')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Create news
router.post('/create-news', newsController.newsControllers.createNews);


//Get one news
router.get('/get-single-news/:id', newsController.newsControllers.getOneNews);


//Get all news
router.get('/all-news', newsController.newsControllers.getAllNews);

//Update news
router.put('/update-news/:id', newsController.newsControllers.updateNews);

//Update single new
router.put('/update-news/:id', newsController.newsControllers.updateNews);

//Delete single new
router.delete('/delete-news/:id', newsController.newsControllers.deleteNews);

module.exports = router;
