const db = require("../db/connection");


exports.checkArticleIDexists = (article_id) => {
 if (!Number(article_id)) {
   return Promise.reject({
     status: 400,
     msg: "Invalid article id",
   });
 }
  return db
    .query(
      `
    SELECT * FROM articles 
    WHERE article_id = $1`,
      [article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "This article id does not exist" });
    });
};


exports.checkTopicExists = (topic) => {
  return db
    .query(
      `
    SELECT * FROM topics
    WHERE slug = $1
    `,
      [topic]
    )
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({ status: 404, msg: "topic not found" });
    });
};
