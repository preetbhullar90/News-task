const {
  fetchArticleById,
  fetchAllArticles,
} = require("../models/articles.model");


module.exports.getArticleById = (req, res, next) => {
    const { article_id } = req.params
    
    fetchArticleById(article_id)
      .then((article) => {
        res.status(200).send({ article });
      })
        .catch((err) => {
        next(err);
      });
};



module.exports.getAllArticles = (req, res, next) => {
  fetchAllArticles()
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};