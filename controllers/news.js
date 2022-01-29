const db = require('../models/index')
const news = db.news


exports.newsControllers = {
  createNews: (req, res) => {
    const singleNews = req.body;
    if (req.body.editorsPick === "on") {
      req.body.editorsPick = true;
    } else {
      req.body.editorsPick = false;
    }
    if (req.body.topStory === "on") {
      req.body.topStory = true;
    } else {
      req.body.topStory = false;
    }
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
  getOneNews: (req, res) => {
    const newsId = req.params.id;

    news
      .findOne({
        where: {
          id: newsId
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