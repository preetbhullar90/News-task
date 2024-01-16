const express = require("express");
const app = express();
const {
  getAllTopics,
} = require("./controllers/news.controllers");

const {
  availableEndpoints,
} = require("./controllers/endpoints.controller");

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api", availableEndpoints);



app.use((req, res, next) => {
    res.status(400).send({ msg: "This path does not exist" });
  
});


app.use('*', (req, res, next) => {
  res.status(500).send({msg:'Internal server error'})
})

module.exports = app;
