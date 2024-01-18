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
        return rows;
      });
}



exports.fetchAddComment = (article_id, username, body) => {
  return db
    .query(`SELECT username FROM users WHERE username = $1`, [username])
    .then((usernameRetrieved) => {
      const { rows } = usernameRetrieved;
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "username not found" });
      } else {
        return db.query(
          `
            INSERT INTO comments (article_id, author, body)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
          [article_id, username, body]
        );
      }
    })
    .then((response) => {
      const { rows } = response;
      return rows[0];
    });
};



exports.checkCommentIDexists = (comment_id) => {
  if (!Number(comment_id)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid comment id",
    });
  }
  return db
    .query( `
    SELECT * FROM comments 
    WHERE comment_id = $1`,
      [comment_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0)
        return Promise.reject({
          status: 404,
          msg: "This comment id does not exist",
        });
    });
};


module.exports.fetchDeleteComment = (comment_id) => {
  return this.checkCommentIDexists(comment_id).then(() => {
    return db
      .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [
        comment_id,
      ])
      .then(({ rows }) => {
        return rows[0];
      });
})
};


