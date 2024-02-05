const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const {getAllTopics} = require("./controllers/news.controllers");
const {availableEndpoints} = require("./controllers/endpoints.controller");
const {
  getArticleById,
  getAllArticles,
  patchArticleById,
  getArticlesByTopic,
} = require("./controllers/articles.controller");
const {
  getAllComments,
  addComment,
  deleteComment,
} = require("./controllers/comments.controller");
const { getAllUsers } = require("./controllers/users.controller");


app.use(express.json());
app.get("/api/topics", getAllTopics);
app.get("/api", availableEndpoints);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id/comments", getAllComments);
app.post("/api/articles/:article_id/comments", addComment);
app.patch("/api/articles/:article_id/", patchArticleById);
app.delete("/api/comments/:comment_id", deleteComment);
app.get("/api/users", getAllUsers);
app.get("/api/articles", getAllTopics);


app.use((req, res, next) => {
    res.status(400).send({ msg: "This path does not exist" });
});
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    return res.status(err.status).send(err);
  }
  return res.status(404).send({ msg: "Not found." });
});
app.use('*', (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: 'Internal server error' })
});


module.exports = app;
