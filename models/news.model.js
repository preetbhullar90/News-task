const db = require("../db/connection");

exports.checkTopicExists=(topic) =>{
  if (typeof topic !== "string") {
    return Promise.reject({ status: 400, msg: "Invalid topic." });
  }


  return db
    .query(
      `SELECT * FROM topics
        WHERE slug = $1;`,
      [topic]
    )
    .then(({rows}) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "This topic does not exist",
        });
      }
    });
}



module.exports.fetchAllTopics = () => {
  return db
    .query(
      `SELECT * FROM topics;`)
      .then(({rows}) => {
          if (rows.length === 0) {
            return Promise.reject({
              status: 404,
              msg: `topics do not exist`,
            });
          }
      return rows;
    });
};








