const express = require("express");
const app = express();
const {
  getAllTopics,
} = require("./controllers/news.controllers");

app.use(express.json());

app.get("/api/topics", getAllTopics);




app.use((err, req, res, next) => {

  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }

  else if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: err.msg || "Bad request" });
  } else {
    
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = app;
