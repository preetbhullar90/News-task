const db = require("../db/connection");
module.exports.fetchAllComments = (article_id) => {

    if (!Number(article_id)) {
        return Promise.reject({
            status: 400,
            msg: "Invalid article id",
        });
    }

    return db
      .query(
        `SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at DESC;`,
        [article_id]
      )
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: `This article id does not exist`,
          });
        }
        return rows;
      });
}
