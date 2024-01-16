const express = require("express");
const app = express();
const {
  getAllTopics,
} = require("./controllers/news.controllers");

const {
  availableEndpoints,
} = require("./controllers/endpoints.controller");

const { getArticleById,getAllArticles } = require("./controllers/articles.controller");

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api", availableEndpoints);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getAllArticles);

app.use((req, res, next) => {
    res.status(400).send({ msg: "This path does not exist" });
  
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    return res.send(err);
  }
  return res.status(404).send({ msg: "Not found." });
});


app.use('*', (err,req, res, next) => {
  res.status(500).send({msg:'Internal server error'})
})

module.exports = app;
