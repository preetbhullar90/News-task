const {
  fetchAllComments,
  fetchAddComment,
  fetchDeleteComment,
} = require("../models/comments.model");
const {checkArticleIDexists} = require("../utils/utils");

module.exports.getAllComments = (req, res, next) => {
    const { article_id } = req.params;
    const fetchAllCommentsQuery=fetchAllComments(article_id)
    const articleIDExistenceQuery = checkArticleIDexists(article_id);
      Promise.all([fetchAllCommentsQuery,articleIDExistenceQuery])  
        .then((response) => {
            const comment=response[0]
        res.status(200).send({comment})
    })
        .catch((err) => {
        next(err)
    })
}


exports.addComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const insertCommentQuery = fetchAddComment(article_id, username, body);
  const articleIDExistenceQuery = checkArticleIDexists(article_id);
  Promise.all([insertCommentQuery, articleIDExistenceQuery])
    .then((response) => {
      const comment = response[0];
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};



module.exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
    fetchDeleteComment(comment_id)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        next(err);
      });
  
};

