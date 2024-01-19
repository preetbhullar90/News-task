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


exports.fetchAllArticles = (topic, sort_by = "created_at", order = "desc") => {
  const queryValues = [];
  const validSortByQueries = [
    "created_at",
    "article_id",
    "title",
    "topic",
    "author",
    "body",
    "votes",
    "article_img_url",
  ];
  const validOrderQueries = ["asc", "desc"];

  if (
    !validSortByQueries.includes(sort_by) ||
    !validOrderQueries.includes(order)
  ) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  let sqlQuery = `
    SELECT author, title, article_id, topic, created_at, votes, article_img_url, CAST((SELECT COUNT(*) FROM comments WHERE comments.article_id = articles.article_id) AS INTEGER) AS comment_count FROM articles 
    `;
  if (topic !== undefined) {
    sqlQuery += ` WHERE topic = $1 `;
    queryValues.push(topic);
  }

  sqlQuery += ` ORDER BY ${sort_by} ${order} `;

  return db.query(sqlQuery, queryValues).then((response) => {
    const { rows } = response;
    return rows;
  });
};


module.exports.fetchPatchArticle= (article_id,inc_votes) => {
  if (!Number(article_id)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid article id",
    });
  }

  if (!Number(inc_votes)) {
    return Promise.reject({
      status: 400,
      msg: "Inc_vote should be a number",
    });
  }
  return db
    .query('UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *', [article_id,inc_votes])
    .then(({ rows }) => {
      return rows[0];
    });
};




