const db = require("../db/connection");
module.exports.fetchArticleById = (article_id) => {

    if (!Number(article_id)) {
        return Promise.reject({
          status: 400,
          msg: "Invalid article id",
        });
    }
    return db
      .query("SELECT * FROM articles WHERE article_id=$1;", [article_id])
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: `This article id does not exist`,
          });
        }
        
        return rows[0];
      });
};


module.exports.fetchAllArticles = () => {
  return db
    .query(`SELECT articles.author,
          articles.title,
          articles.article_id,
          articles.topic,
          articles.created_at,
          articles.votes,
          articles.article_img_url,
          COUNT(comments.comment_id) AS comment_count
        FROM
          articles
        LEFT JOIN
          comments ON articles.article_id = comments.article_id
        GROUP BY
          articles.article_id
        ORDER BY
          articles.created_at DESC;`)
      
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `This article does not exist`,
        });
      }

      return rows;
    });
};