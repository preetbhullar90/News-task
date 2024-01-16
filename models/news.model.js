const db = require("../db/connection");


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





