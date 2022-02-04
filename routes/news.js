var express = require('express');
var router = express.Router();
var newsController = require('../controllers/news');

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

//Get news by category (10 at a time);
router.get('/:categoryName/:id', newsController.newsControllers.getByCategory);

//Get news all news (10 at a time); for error control
// category name must be news in this case
router.get('/:categoryName', newsController.newsControllers.getByCategory);

//Get one news
router.get('/get-single-news/:id', newsController.newsControllers.getOneNews);


//Get all news
// router.get('/all', newsController.newsControllers.getAllNews);

//Get all contents for index page
router.get('/', newsController.newsControllers.getLanding);

//Update news
router.put('/update/:id', newsController.newsControllers.updateNews);

//Update single new
// router.put('/update-news/:id', newsController.newsControllers.updateNews);

//Delete single new
router.delete('/delete-news/:id', newsController.newsControllers.deleteNews);

module.exports = router;
