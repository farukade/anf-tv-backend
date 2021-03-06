const db = require('../models/index');
const news = db.news;


exports.newsControllers = {
  getLanding: (req, res) => {
    const resArr = [];
    news.findAll()
        .then((data) => {
          // res.send(data);
          // console.log(data);
          const topStories = [];
          const editorsPick = [];
          const featured = [];
          const topInCat = [];
          const pickedCat = [];

          //sort from new to old
          const newData = data.reverse();
          newData.forEach(element => {
            let tops = element.topStory;
            // console.log(tops);
            let edits = element.editorsPick;
            // console.log(edits);
            let cat = element.category;
            // console.log(cat);
            if (tops) {
              if (pickedCat.indexOf(cat) < 0) {
                topInCat.push(element);
                pickedCat.push(cat);
              }
              topStories.push(element);
            } else if (edits) {
              editorsPick.push(element);
            }; 
            if (featured.length < 30) {
              featured.push(element);
            }
          });
          resArr.push(topStories);
          resArr.push(editorsPick);
          resArr.push(featured);
          resArr.push(topInCat);

          res.status(200)
             .send(resArr);
        })
        .catch((err) => {
          res.status(400)
             .send(err.message);
        })
  },
  createNews: (req, res) => {
    const singleNews = req.body;
    let category = singleNews.category;
    category = category.toLowerCase();
    if (category === 'politics' || category === 'sports' || category === 'technology' || category === 'business' || category === 'culture' || category === 'entertainment') {
    singleNews.category = singleNews.category.charAt(0).toUpperCase() + singleNews.category.slice(1);
    console.log(singleNews.category);
      news
      .create(singleNews)
        .then((data) => {
          res
            .status(200)
            .send({
              message: "News added successfully",
              status: "Success",
              data: data
            })
        })
        .catch((err) => {
          res
            .status(400)
            .send(err)
        })
    } else {
      res.status(400)
         .send({
           message: "invalid category"
         })
    }
    
  }, 
  updateNews: (req, res) => {
    const newsId = req.params.id;
    const singleNews = req.body;

    news
      .update(singleNews, {
        where: {
          id: newsId
        }
      })
      .then((data) => {
        if(data[0] !== 1) {
          res
            .status(400)
            .send({
            message: "Record not found",
          });
        }
        res
          .status(200)
          .send({
            message: "News Updated"});
      })
      .catch((err) => {
        res
          .status(400)
          .send(err)
      })
  }, 
  getAllNews: (req, res) => {
    news
      .findAll()
        .then((data) => {
          let newData = [];
          newData = data.reverse();
          res
            .status(200)
            .send(newData);
        })
        .catch((err) => {
          res
            .status(400)
            .send(err)
        })
  },
  getByCategory: (req, res) => {
    news
      .findAll()
        .then((data) => {
          let catArr = [];
          let newsArr = [];
          let categoryName = req.params.categoryName;
          categoryName = categoryName.toLowerCase();
          if (categoryName === "news") {
            let newData = data.reverse();
            res.status(200)
               .send(newData);
          } else {
          // console.log(categoryName);
          // res.send(categoryName);
          let num = req.params.id;
          num = (Number(num)) * 10;
          // console.log(num);
          // console.log(typeof(num) === Number);
          let idChecker = [-10];
          // console.log(data);
          data.forEach(element => {
            let currentCatName = element.category;
            currentCatName = currentCatName.toLowerCase();
            // console.log(currentCatName);
            if(categoryName == currentCatName){
              catArr.push(element);
            };
          });
          
          // console.log(catArr);
          // res.send(catArr);
          
          // console.log(num -10);
          for (let i = num; i > (num - 10); i--) {
            if (catArr[i]) {
              let currentId = catArr[i].id;
              if (idChecker.indexOf(currentId) < 0) {
                newsArr.push(catArr[i]);
              };
            }
            }
          // console.log(newsArr.length);
          res
            .status(200)
            .send(newsArr);
          }
        })
        .catch((err) => {
          res
            .status(400)
            .send(err.message)
        })
  },
  getOne: (req, res) => {
    news.findOne({
      where: {
          id: req.params.id
        }
      })
        .then((data) => {
          console.log('success');
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
  deleteNews: (req, res) => {
    const newsId = req.params.id;

    news
      .destroy({
        where: {
          id: newsId
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
            message: "News deleted"});
      })
      .catch((err) => {
        res
          .status(400)
          .send(err);
      });
  }
}