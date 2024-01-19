const {
  fetchArticleById,
  fetchAllArticles,
  fetchPatchArticle,
} = require("../models/articles.model");
const { checkTopicExists } = require("../utils/utils");

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


exports.getAllArticles = (req, res, next) => {
  const { topic, sort_by, order } = req.query;
  const selectArticlesQuery = fetchAllArticles(topic, sort_by, order);

  const queries = [selectArticlesQuery];

  if (topic) {
    const topicExistenceQuery = checkTopicExists(topic);
    queries.push(topicExistenceQuery);
  }

  Promise.all(queries)
    .then((response) => {
      const article = response[0];
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};


module.exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  
  fetchPatchArticle(article_id,inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};


