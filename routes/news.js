var express = require('express');
var router = express.Router();
var newsController = require('../controllers/news')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Create news
router.post('/create', newsController.newsControllers.createNews);


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
