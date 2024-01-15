const {
  fetchAllTopics,
} = require("../models/news.model");

module.exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topic) => {
      res.status(200).send({ topic});
    })
    .catch((err) => {
      next(err);
    });
};
